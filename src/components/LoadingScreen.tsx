import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const loadingMessages = [
    "Loading...",
    "Please wait...",
    "Almost ready...",
    "Just a moment..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-white z-50 flex items-center justify-center">
      <div className="relative flex flex-col items-center">
        {/* Main loading circle with emoji */}
        <div className="relative w-32 h-32">
          {/* Outer spinning circle */}
          <motion.div
            className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Emoji in center */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-4xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [-5, 5, -5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🤖
          </motion.div>
        </div>

        {/* Loading text */}
        <motion.div
          className="mt-8 text-blue-600 font-medium text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-xl"
          >
            {loadingMessages[messageIndex]}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen; 