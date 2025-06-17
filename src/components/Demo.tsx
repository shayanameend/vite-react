import React, { useState, useEffect, useCallback } from "react";

import "./demo.css";

interface Heart {
  id: number;
  x: number;
  y: number;
  speed: number;
}

interface Message {
  text: string;
  type: "apology" | "love" | "fun";
}

const messages: Message[] = [
  {
    text: "I'm sorry I didn't really listen when you were stressed 😔",
    type: "apology",
  },
  {
    text: "Seeing you in the corridor brightens even my worst days ✨",
    type: "love",
  },
  {
    text: "Remember our chai at the canteen? I miss your laughter over my nashta choices ☕️",
    type: "fun",
  },
  {
    text: "That shopping in ramadan was one of my favorite days with you 🛍️",
    type: "love",
  },
  {
    text: "I'm sorry I let my frustration get the better of me 😞",
    type: "apology",
  },
  {
    text: "You're the only thing that makes NED feel like home 🏡",
    type: "love",
  },
  {
    text: "I promise I'll be the one running to your door when you need me 🚪",
    type: "apology",
  },
  {
    text: "You're the reason I look forward to going to uni every single day 🌟",
    type: "love",
  },
  {
    text: "I love how you always make me smile, even when I'm grumpy 😄",
    type: "love",
  },
  {
    text: "I know I can be a pain sometimes, but I really do love you so much 💖",
    type: "apology",
  },
];

const Demo: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [score, setScore] = useState(0);
  const [currentMessage, setCurrentMessage] = useState<Message>(messages[0]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const spawnHeart = useCallback(() => {
    const newHeart: Heart = {
      id: Date.now() + Math.random(),
      x: Math.random() * (window.innerWidth - 50),
      y: -50,
      speed: 2 + Math.random() * 3,
    };
    setHearts((prev) => [...prev, newHeart]);
  }, []);

  const moveHearts = useCallback(() => {
    setHearts((prev) =>
      prev
        .map((heart) => ({ ...heart, y: heart.y + heart.speed }))
        .filter((heart) => heart.y < window.innerHeight + 50)
    );
  }, []);

  const handleHeartClick = (heartId: number) => {
    setHearts((prev) => prev.filter((heart) => heart.id !== heartId));
    setScore((prev) => {
      const newScore = prev + 1;
      if (newScore < messages.length) {
        setCurrentMessage(messages[newScore]);
      } else if (newScore === messages.length) {
        setShowFinalMessage(true);
      }
      return newScore;
    });
  };

  useEffect(() => {
    if (!gameStarted) return;

    const spawnInterval = setInterval(spawnHeart, 1500);
    const moveInterval = setInterval(moveHearts, 50);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(moveInterval);
    };
  }, [gameStarted, spawnHeart, moveHearts]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setCurrentMessage(messages[0]);
    setShowFinalMessage(false);
  };

  if (showFinalMessage) {
    return (
      <div className="game-container final-screen">
        <div className="final-message">
          <h1>💕 I Love You So Much! 💕</h1>
          <p>Thank you for playing my silly little game</p>
          <p>You caught {score} hearts, just like you caught mine! 💖</p>
          <p>I'm truly sorry and I love you more than words can say</p>
          <button
            onClick={() => window.location.reload()}
            className="play-again-btn"
          >
            Play Again? 🥰
          </button>
        </div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="game-container start-screen">
        <div className="start-message">
          <h1>💝 A Special Game For You 💝</h1>
          <p>My dearest neham,</p>
          <p>
            I made this little game to say sorry and show you how much I love
            you
          </p>
          <p>Catch the falling hearts to see my messages! 💕</p>
          <button onClick={startGame} className="start-btn">
            Start Game 💖
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="score">Hearts Caught: {score} 💕</div>
      </div>

      <div className="message-display">
        <div className={`message ${currentMessage.type}`}>
          {currentMessage.text}
        </div>
      </div>

      <div className="game-area">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart"
            style={{ left: heart.x, top: heart.y }}
            onClick={() => handleHeartClick(heart.id)}
          >
            💖
          </div>
        ))}
      </div>

      <div className="instructions">Click the hearts to catch them! 💕</div>
    </div>
  );
};

export default Demo;
