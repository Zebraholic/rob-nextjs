'use client';
import { useState } from 'react';

function ButtonOpen() {
  const handleClick = () => {
    const words = ['Hello', 'World', 'React', 'Next.js', 'JavaScript'];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    document.getElementById('hello').textContent = randomWord;
  };

  return (
    <div>
      <button 
        onClick={handleClick} 
        style={{ backgroundColor: 'darkblue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}
      >
        Click me
      </button>
      <div id="hello"></div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <ButtonOpen />
    </div>
  );
}