import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Volume2 } from "lucide-react";

export default function ValentineProposal() {
  const [step, setStep] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [noClicks, setNoClicks] = useState(0);
  const [musicStarted, setMusicStarted] = useState(false);
  const audioRef = useRef(null);

  // 🔥 Auto-play music on load (muted first to allow autoplay in browsers)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setMusicStarted(true);
          })
          .catch(() => {
            // If autoplay is blocked, try again on first user interaction
            const enableAudio = () => {
              audioRef.current.play();
              setMusicStarted(true);
              window.removeEventListener("click", enableAudio);
            };
            window.addEventListener("click", enableAudio);
          });
      }
    }
  }, []);

  const startMusic = () => {
    if (audioRef.current && !musicStarted) {
      audioRef.current.play();
      setMusicStarted(true);
    }
  };

  const nextStep = () => {
    startMusic();
    setStep(step + 1);
  };

  const handleNo = () => {
    setNoClicks(noClicks + 1);
  };

  // 🔥 Put your song inside /public folder and name it music.mp3
  // Example: /public/music.mp3

  // 🔥 REPLACE these with your actual photos (put them in /public folder)
  const photos = [
    "/photo1.jpg",
    "/photo2.jpg",
    "/photo3.jpg",
    "/photo4.jpg",
  ];

  const noMessages = [
    "Are you sure? 🥺",
    "Think again…",
    "I’ll bring snacks 😌",
    "What if I cook for you? 🍳",
    "Okay this button is just decoration now 😂",
  ];

  const introScreens = [
    {
      title: "Hey Beautiful ❤️",
      text: "I have something important to ask you...",
    },
    {
      title: "But First 👀",
      text: "Do you know how special you are to me?",
    },
    {
      title: "You Make My World Better 🌍",
      text:
        "Your smile, your heart, your energy — everything about you is amazing.",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-rose-200 to-pink-300 flex items-center justify-center p-6">
      {/* 🎵 Background Music */}
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      {/* FLOATING BACKGROUND PHOTOS */}
      <div className="absolute inset-0 -z-10">
        {photos.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt="memory"
            initial={{ y: 0, x: 0, opacity: 0.25 }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute w-32 h-32 md:w-40 md:h-40 object-cover rounded-2xl shadow-xl blur-sm
              ${index === 0 && "top-10 left-10"}
              ${index === 1 && "bottom-16 right-16"}
              ${index === 2 && "top-1/3 right-10"}
              ${index === 3 && "bottom-10 left-1/4"}
            `}
          />
        ))}
      </div>

      <motion.div
        key={step}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl"
      >
        <Card className="rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md">
          <CardContent className="p-8 text-center space-y-6">
            

            {/* INTRO SCREENS */}
            {step < introScreens.length && !accepted && (
              <div className="space-y-6">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="flex justify-center"
                >
                  <Heart className="w-16 h-16 text-rose-500 animate-pulse" />
                </motion.div>

                <h1 className="text-3xl md:text-4xl font-bold text-rose-600">
                  {introScreens[step].title}
                </h1>

                <p className="text-lg text-gray-700">
                  {introScreens[step].text}
                </p>

                <Button
                  onClick={nextStep}
                  className="text-lg px-8 py-6 rounded-2xl bg-rose-500 hover:bg-rose-600"
                >
                  Continue 💕
                </Button>
              </div>
            )}

            {/* MAIN QUESTION */}
            {step >= introScreens.length && !accepted && (
              <div className="space-y-6">
                <h1 className="text-3xl md:text-4xl font-bold text-rose-600">
                  Chepng'eno ❤️
                </h1>

                <p className="text-xl font-semibold text-rose-500">
                  Will you be my Valentine? 💌
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button
                    onClick={() => {
                      startMusic();
                      setAccepted(true);
                    }}
                    className="text-lg px-8 py-6 rounded-2xl bg-rose-500 hover:bg-rose-600"
                  >
                    Yes 💖
                  </Button>

                  <motion.div
                    animate={{ x: noClicks * 15 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Button
                      onClick={handleNo}
                      variant="outline"
                      className="text-lg px-8 py-6 rounded-2xl"
                    >
                      {noMessages[
                        Math.min(noClicks, noMessages.length - 1)
                      ]}
                    </Button>
                  </motion.div>
                </div>
              </div>
            )}

            {/* SUCCESS SCREEN */}
            {accepted && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-rose-600">
                  She Said YES! 🎉❤️
                </h2>
                <p className="text-lg text-gray-700">
                  Best decision ever. Get ready for love, laughter, and beautiful memories together.
                </p>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="flex justify-center"
                >
                  <Heart className="w-14 h-14 text-rose-500" />
                </motion.div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-sm text-rose-700 mt-6">
          Made with love by Martin 💕
        </p>
      </motion.div>
    </div>
  );
}
