import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const [step, setStep] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.5;
    audioRef.current.play().catch(() => {
      const resume = () => {
        audioRef.current.play();
        window.removeEventListener("click", resume);
      };
      window.addEventListener("click", resume);
    });
  }, []);

  const introScreens = [
    "Hey Beautiful ❤️ I have something important to ask you...",
    "Before I ask... do you know how special you are to me? 💕",
    "You make my world brighter every single day ☀️",
  ];

  const photos = ["/photo1.jpg", "/photo2.jpg", "/photo3.jpg", "/photo4.jpg"];

  return (
    <div style={styles.page}>
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Photos */}
      {photos.map((src, i) => (
        <img
          key={i}
          src={src}
          alt="memory"
          style={{
            ...styles.photo,
            top: `${10 + i * 20}%`,
            left: `${5 + i * 20}%`,
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}

      <div style={styles.card}>
        {!accepted && step < introScreens.length && (
          <>
            <h1>{introScreens[step]}</h1>
            <button style={styles.button} onClick={() => setStep(step + 1)}>
              Continue 💕
            </button>
          </>
        )}

        {!accepted && step >= introScreens.length && (
          <>
            <h1>Chepng'eno ❤️</h1>
            <h2>Will you be my Valentine? 💌</h2>
            <div style={{ marginTop: "20px" }}>
              <button style={styles.button} onClick={() => setAccepted(true)}>
                Yes 💖
              </button>
            </div>
          </>
        )}

        {accepted && (
          <>
            <h1>She said YES! 🎉❤️</h1>
            <p>This is the best day ever 💕</p>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #ffd1dc, #ff9eb5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    zIndex: 2,
  },
  button: {
    padding: "12px 25px",
    fontSize: "16px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#ff4d6d",
    color: "white",
    cursor: "pointer",
  },
  photo: {
    position: "absolute",
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "15px",
    opacity: 0.3,
    animation: "float 6s ease-in-out infinite",
  },
};

// Add floating animation safely
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }
  `;
  document.head.appendChild(style);
}
