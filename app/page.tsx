import Image from "next/image";
import ButtonOpen from "./components/ButtonOpen";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
       <h1 className="text-6xl text-center">HI THERE!!</h1>
      </div>

      <div className="w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p id="hello" className="text-2xl text-center">I am a full-stack developer!</p>
      </div>

      <ButtonOpen />
    </main>
  );
}
