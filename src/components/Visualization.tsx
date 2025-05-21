import React, { useEffect, useRef, useState } from 'react';
import { graphviz } from 'd3-graphviz';
import { useAutomata, getCurrentAutomaton } from '../context/AutomataContext';
import { generateDotGraph, CFG, DFA, PDA } from '../automata';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2, RotateCcw, X as XIcon } from 'lucide-react';

const Visualization: React.FC = () => {
  const { selectedSample, selectedType, currentSimulationStep, simulationStates, isSimulating } = useAutomata();
  const graphRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!graphRef.current) return;

    setIsLoading(true);
    // Clear previous visualization
    graphRef.current.innerHTML = '';

    const automaton = getCurrentAutomaton(selectedSample, selectedType);
    
    if (selectedType === 'CFG') {
      if (graphRef.current) {
        const productions = (automaton as CFG).productions;
        const formattedProductions = productions.map((prod: string) => {
          // Format each production with proper spacing and line breaks
          const [lhs, rhs] = prod.split('→').map(s => s.trim());
          const formattedRhs = rhs
            .split('|')
            .map(part => part.trim())
            .join(' | ');
          return `${lhs} → ${formattedRhs}`;
        });
        graphRef.current.innerHTML = `
          <div class="p-6 font-mono text-sm space-y-3 min-h-[384px] bg-gray-50 rounded-lg">
            ${formattedProductions.map(prod => `<div class="p-2 hover:bg-gray-100 rounded transition-colors">${prod}</div>`).join('')}
          </div>
        `;
        setIsLoading(false);
      }
      return;
    }
    
    // Using static images for PDA visualization
    if (selectedType === 'PDA') {
      const imagePath = selectedSample === 'sample1' ? '/images/PDA1.png' : '/images/PDA2.png';
      graphRef.current.innerHTML = `
        <div class="flex justify-center items-center h-full p-4">
          <img 
            src="${imagePath}" 
            alt="${selectedSample === 'sample1' ? 'PDA 1' : 'PDA 2'}" 
            class="max-w-full max-h-full object-contain rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
          />
        </div>
      `;
      setIsLoading(false);
      return;
    }

    const highlightedState = isSimulating && simulationStates.length > 0 
      ? simulationStates[currentSimulationStep] 
      : undefined;
      
    const dotGraph = generateDotGraph(automaton as DFA | PDA, highlightedState, '#000000');

    try {
      graphviz(graphRef.current, {
        fit: true,
        zoom: false,
        useWorker: false,
        width: graphRef.current.clientWidth,
        height: graphRef.current.clientHeight,
        scale: 1,
      })
        .renderDot(dotGraph)
        .on('end', () => {
          if (graphRef.current) {
            const svg = graphRef.current.querySelector('svg');
            if (svg) {
              svg.style.display = 'block';
              svg.style.margin = 'auto';
              svg.style.maxWidth = '100%';
              svg.style.height = '100%';
            }
          }
          setIsLoading(false);
        });
    } catch (error) {
      console.error('Error rendering graph:', error);
      setIsLoading(false);
    }
  }, [selectedSample, selectedType, currentSimulationStep, simulationStates, isSimulating]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const resetView = () => {
    if (graphRef.current) {
      const svg = graphRef.current.querySelector('svg');
      if (svg) {
        svg.style.transform = 'scale(1)';
        svg.style.transformOrigin = 'center';
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Visualization</h2>
        <div className="flex space-x-2">
          <button
            onClick={resetView}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Reset View"
          >
            <RotateCcw size={20} />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>
      </div>
      
      <div className={`bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-300 ${
        isFullscreen ? 'fixed inset-4 z-50 pt-20' : ''
      }`}>
        <div className="relative">
          {/* X button for fullscreen close */}
          {isFullscreen && (
            <button
              onClick={toggleFullscreen}
              className="fixed top-20 right-8 z-[100] p-3 bg-white hover:bg-gray-100 rounded-full shadow-lg border border-gray-300 transition-colors flex items-center justify-center"
              title="Close Fullscreen"
            >
              <XIcon size={24} className="text-gray-800" />
            </button>
          )}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/80 flex items-center justify-center z-10"
              >
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div 
            ref={graphRef} 
            className={`w-full transition-all duration-300 cursor-automata ${
              selectedType === 'PDA' 
                ? isFullscreen ? 'h-[calc(100vh-8rem)]' : 'h-[800px]' 
                : selectedType === 'CFG' 
                  ? 'h-auto' 
                  : isFullscreen ? 'h-[calc(100vh-8rem)]' : 'h-96'
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Visualization;