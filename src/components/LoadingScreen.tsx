import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const loadingMessages = [
    "Initializing Automata...",
    "Loading Neural Networks...",
    "Preparing Visualizations...",
    "Almost Ready..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 z-50 flex items-center justify-center">
      <div className="relative flex flex-col items-center">
        {/* Main loading animation */}
        <div className="relative w-40 h-40">
          {/* Outer spinning circle */}
          <motion.div
            className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Middle spinning circle */}
          <motion.div
            className="absolute inset-4 border-4 border-purple-500 border-t-transparent rounded-full"
            animate={{ rotate: -360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Inner spinning circle */}
          <motion.div
            className="absolute inset-8 border-4 border-pink-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Center icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [-5, 5, -5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Brain className="w-16 h-16 text-indigo-600" />
          </motion.div>
        </div>

        {/* Loading text */}
        <div className="mt-8 text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            >
              {loadingMessages[messageIndex]}
            </motion.p>
          </AnimatePresence>
          
          {/* Progress dots */}
          <div className="flex justify-center space-x-2 mt-4">
            {[0, 1, 2, 3].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 rounded-full bg-indigo-600"
                animate={{
                  scale: messageIndex === index ? [1, 1.2, 1] : 1,
                  opacity: messageIndex === index ? 1 : 0.5
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 