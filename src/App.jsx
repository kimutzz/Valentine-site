import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function ValentineProposal() {
  const [step, setStep] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [noClicks, setNoClicks] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.5;
    const p = audioRef.current.play();
    if (p?.catch) {
      p.catch(() => {
        const resume = () => {
          audioRef.current?.play();
          window.removeEventListener("click", resume);
        };
        window.addEventListener("click", resume);
      });
    }
  }, []);

  const nextStep = () => setStep((s) => s + 1);
  const handleNo = () => setNoClicks((n) => n + 1);

  const photos = ["/photo1.jpg", "/photo2.jpg", "/photo3.jpg", "/photo4.jpg"];

  const noMessages = [
    "Are you sure? 🥺",
    "Think again…",
    "I’ll bring snacks 😌",
    "What if I cook for you? 🍳",
    "Okay this button is just decoration now 😂",
  ];

  const introScreens = [
    { title: "Hey Beautiful ❤️", text: "I have something important to ask you..." },
    { title: "But First 👀", text: "Do you know how special you are to me?" },
    { title: "You Make My World Better 🌍", text: "Your smile, your heart, your energy — everything about you is amazing." },
  ];

  const buttonBase = "text-lg px-8 py-3 rounded-2xl border transition";

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-rose-200 to-pink-300 flex items-center justify-center p-6">
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <div className="absolute inset-0 -z-10">
        {photos.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt="memory"
            initial={{ y: 0, x: 0, opacity: 0.25 }}
            animate={{ y: [0, -30, 0], x: [0, 20, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 8 + index * 2, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute w-32 h-32 md:w-40 md:h-40 object-cover rounded-2xl shadow-xl blur-sm
              ${index === 0 ? "top-10 left-10" : ""}
              ${index === 1 ? "bottom-16 right-16" : ""}
              ${index === 2 ? "top-1/3 right-10" : ""}
              ${index === 3 ? "bottom-10 left-1/4" : ""}`}
          />
        ))}
      </div>

      <motion.div
        key={step + (accepted ? "-yes" : "")}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl"
      >
        <div className="rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md p-8 text-center space-y-6">
          {step < introScreens.length && !accepted && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <Heart className="w-16 h-16 text-rose-500 animate-pulse" />
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-rose-600">{introScreens[step].title}</h1>
              <p className="text-lg text-gray-700">{introScreens[step].text}</p>

              <button
                onClick={nextStep}
                className={`${buttonBase} bg-rose-500 text-white border-rose-500 hover:bg-rose-600`}
              >
                Continue 💕
              </button>
            </div>
          )}

          {step >= introScreens.length && !accepted && (
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-rose-600">Chepng'eno ❤️</h1>
              <p className="text-xl font-semibold text-rose-500">Will you be my Valentine? 💌</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <button
                  onClick={() => setAccepted(true)}
                  className={`${buttonBase} bg-rose-500 text-white border-rose-500 hover:bg-rose-600`}
                >
                  Yes 💖
                </button>

                <motion.button
                  onClick={handleNo}
                  animate={{ x: noClicks * 15 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className={`${buttonBase} bg-white text-gray-800 border-gray-300 hover:bg-gray-50`}
                >
                  {noMessages[Math.min(noClicks, noMessages.length - 1)]}
                </motion.button>
              </div>
            </div>
          )}

          {accepted && (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-6">
              <h2 className="text-3xl font-bold text-rose-600">She Said YES! 🎉❤️</h2>
              <p className="text-lg text-gray-700">Best decision ever. Get ready for love, laughter, and beautiful memories together.</p>
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="flex justify-center">
                <Heart className="w-14 h-14 text-rose-500" />
              </motion.div>
            </motion.div>
          )}
        </div>

        <p className="text-center text-sm text-rose-700 mt-6">Made with love by Martin 💕</p>
      </motion.div>
    </div>
  );
}
