"use client";

import { useState, useRef } from "react";

export default function MyComponent() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = () => {
    if (!audioRef.current) return;

    audioRef.current.loop = true; // 🔹 Pastikan audio tetap loop
    audioRef.current.currentTime = 0; // 🔹 Restart dari awal
    audioRef.current.play().catch((err) => console.error("Error playing audio:", err));

    setIsPlaying(true);
  };

  const stopAudio = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0; // 🔹 Reset ke awal
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 flex flex-col items-center justify-center">
		<div className="text-black text-4xl font-bold -mt-40 mb-4">
			<h1>BILIH HAREDANG</h1>
		</div>
      {/* Animasi hanya aktif jika isPlaying true */}
      <div
        className={`${isPlaying ? "animate-spin" : "animate-none"}`}
        style={{ animationDuration: "100ms" }} // 🔹 Perputaran lebih cepat
      >
        <img src="/fan.png" alt="kipas" />
      </div>

      {/* Tombol Play dan Stop */}
      <div className="mt-10 flex gap-4">
        <button
          onClick={playAudio}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-400 transition"
        >
          On
        </button>
        <button
          onClick={stopAudio}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-400 transition"
        >
          Off
        </button>
      </div>

      {/* Audio dengan loop */}
      <audio ref={audioRef} src="/fan.mp3" />
    </div>
  );
}
