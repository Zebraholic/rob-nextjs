import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const RATE_LIMIT_MS = 60_000; // 1 minute between submissions per IP
const recentSubmissions = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, _honey } = body;

    // Honeypot — bots fill hidden fields
    if (_honey) {
      return NextResponse.json({ success: true }); // silently ignore
    }

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (typeof name !== "string" || name.length > 200) {
      return NextResponse.json({ error: "Invalid name." }, { status: 400 });
    }
    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }
    if (typeof message !== "string" || message.length > 5000) {
      return NextResponse.json({ error: "Message too long." }, { status: 400 });
    }

    // Simple rate limiting by IP
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const lastSubmission = recentSubmissions.get(ip);
    if (lastSubmission && Date.now() - lastSubmission < RATE_LIMIT_MS) {
      return NextResponse.json(
        { error: "Please wait a moment before sending another message." },
        { status: 429 }
      );
    }
    recentSubmissions.set(ip, Date.now());

    // Clean up old entries periodically
    if (recentSubmissions.size > 1000) {
      const now = Date.now();
      for (const [key, time] of recentSubmissions) {
        if (now - time > RATE_LIMIT_MS * 5) recentSubmissions.delete(key);
      }
    }

    const sanitize = (str: string) =>
      str.replace(/[<>]/g, (c) => (c === "<" ? "&lt;" : "&gt;"));

    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `Portfolio Contact: ${sanitize(name)}`,
      html: `
        <h2>New message from your portfolio website robtavares.com</h2>
        <p><strong>Name:</strong> ${sanitize(name)}</p>
        <p><strong>Email:</strong> ${sanitize(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitize(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
