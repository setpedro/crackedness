import { useState, useEffect } from "react";

const messagesByLevel: Record<string, string[]> = {
  normie: [
    "Installing Bootstrap...",
    "Counting div soup layers...",
    "Measuring jQuery dependency...",
    "Scanning for console.log() usage...",
  ],
  mild: [
    "Analyzing git commit message profanity levels...",
    "Measuring VSCode extension count...",
    "Calculating Stack Overflow visits per hour...",
    "Detecting dark theme purity...",
  ],
  concerning: [
    "Scanning vim muscle memory formation...",
    "Measuring mechanical keyboard decibel levels...",
    "Analyzing terminal customization depth...",
    "Calculating caffeine/code ratio...",
  ],
  severe: [
    "Detecting signs of Linux distro hopping...",
    "Analyzing dotfiles repository size...",
    "Measuring neovim config complexity...",
    "Scanning for custom keyboard firmware...",
  ],
  terminal: [
    "CALCULATING BRAIN ROT LEVELS...",
    "Detecting signs of Haskell curiosity...",
    "Measuring Emacs pinky severity...",
    "Analyzing time spent in terminal...",
  ],
};

const asciiArt = [
  `
   _____
  |     |
  | | | |
  |_____|
  loading
  `,
  `
   /\\__/\\
  (=o.o=)
   >^<
  loading
  `,
  `
   ______
  < WAIT >
  -------
      \\   ^__^
       \\  (oo)\\_______
          (__)\\       )\\/\\
              ||----w |
              ||     ||
  `,
  `
   /\\_/\\  
  ( o.o ) 
   > ^ <
  loading
  `,
];

const glitchKeyframes = `
  @keyframes glitch {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-2px, 2px);
    }
    40% {
      transform: translate(-2px, -2px);
    }
    60% {
      transform: translate(2px, 2px);
    }
    80% {
      transform: translate(2px, -2px);
    }
    100% {
      transform: translate(0);
    }
  }
`;

const LoadingSplash = () => {
  const [currentMessage, setCurrentMessage] = useState({
    text: "",
    level: "normie",
  });
  const [currentAscii, setCurrentAscii] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Message cycle
    const messageInterval = setInterval(() => {
      const levels = Object.keys(messagesByLevel);
      const randomLevel = levels[Math.floor(Math.random() * levels.length)];
      const messages = messagesByLevel[randomLevel];
      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];

      setCurrentMessage({ text: randomMessage, level: randomLevel });
    }, 2000);

    // ASCII art cycle
    const asciiInterval = setInterval(() => {
      setCurrentAscii((prev) => (prev + 1) % asciiArt.length);
    }, 3000);

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      const shouldGlitch = Math.random() < 0.3;
      if (shouldGlitch) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }
    }, 1000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(asciiInterval);
      clearInterval(glitchInterval);
    };
  }, []);

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      normie: "text-blue-500",
      mild: "text-green-500",
      concerning: "text-yellow-500",
      severe: "text-orange-500",
      terminal: "text-red-500",
    };
    return colors[level] || colors.normie;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-black text-green-500">
      <style>{glitchKeyframes}</style>

      {/* Matrix-style background rain effect */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="matrix-rain">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="matrix-column"
              style={{
                left: `${i * 2}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {Array.from({ length: 20 }).map((_, j) => (
                <span
                  key={j}
                  className="matrix-character"
                  style={{
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                >
                  {String.fromCharCode(0x30a0 + Math.random() * 96)}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ASCII Art */}
      <pre
        className={`text-xs mb-8 font-mono ${
          glitchActive ? "animate-glitch" : ""
        }`}
        style={{
          whiteSpace: "pre",
          animation: glitchActive ? "glitch 0.2s infinite" : "none",
        }}
      >
        {asciiArt[currentAscii]}
      </pre>

      {/* Loading Spinner */}
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-t-transparent border-yellow-500 rounded-full animate-spin-slow"></div>
        <div className="absolute inset-4 border-4 border-t-transparent border-red-500 rounded-full animate-spin-slower"></div>
      </div>

      {/* Loading Message */}
      <div
        className={`font-mono text-center transition-all duration-300 ${getLevelColor(
          currentMessage.level
        )}`}
        style={{
          animation: glitchActive ? "glitch 0.2s infinite" : "none",
        }}
      >
        <div className="text-2xl mb-4 font-bold">ANALYZING CRACKEDNESS</div>
        <div className="text-lg h-8 transition-all duration-500 ease-in-out">
          {currentMessage.text}
        </div>
      </div>

      {/* Progress Elements */}
      <div className="mt-8 w-64 bg-gray-800 h-2 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-200"
          style={{
            width: `${Math.random() * 100}%`,
            animation: "progress 2s infinite",
          }}
        />
      </div>

      {/* Warning Message */}
      <div className="mt-6 font-mono text-xs text-red-500 animate-pulse">
        WARNING: TERMINAL BRAIN ROT DETECTED
      </div>
    </div>
  );
};

export default LoadingSplash;

const styles = `
@keyframes matrix-rain {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

@keyframes progress {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-spin-slow {
  animation: spin 3s linear infinite;
}

.animate-spin-slower {
  animation: spin 4s linear infinite;
}

.animate-glitch {
  animation: glitch 0.2s infinite;
}

.matrix-rain {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.matrix-column {
  position: absolute;
  top: 0;
  animation: matrix-rain 20s linear infinite;
  color: #00ff00;
  font-family: monospace;
  font-size: 12px;
}

.matrix-character {
  display: block;
  opacity: 0;
  animation: fade-in-out 2s linear infinite;
}

@keyframes fade-in-out {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}
`;
