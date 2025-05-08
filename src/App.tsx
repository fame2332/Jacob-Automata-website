import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Members from './pages/Members';
import About from './pages/About';
import Contact from './pages/Contact';
import { AutomataProvider } from './context/AutomataContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import InteractiveBackground from './components/InteractiveBackground';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <InteractiveBackground />
        <AutomataProvider>
          <Header />
          <main className="flex-grow relative z-10">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Home />
                  </motion.div>
                } />
                <Route path="/about" element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <About />
                  </motion.div>
                } />
                <Route path="/members" element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Members />
                  </motion.div>
                } />
                <Route path="/contact" element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Contact />
                  </motion.div>
                } />
              </Routes>
            </AnimatePresence>
          </main>
          <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-6 mt-auto relative z-10">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <p className="text-sm">Automata Project &copy; {new Date().getFullYear()}</p>
                  <p className="text-xs text-gray-400 mt-1">A project by BCS33 - DLSUD</p>
                </div>
                <div className="flex space-x-4">
                  <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">
                    <span className="text-sm">Contact Us</span>
                  </Link>
                  <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-300">
                    <span className="text-sm">About the Project</span>
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </AutomataProvider>
      </div>
    </Router>
  );
}

export default App;