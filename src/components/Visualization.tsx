import React, { useEffect, useRef } from 'react';
import { graphviz } from 'd3-graphviz';
import { useAutomata, getCurrentAutomaton } from '../context/AutomataContext';
import { generateDotGraph } from '../automata';

const Visualization: React.FC = () => {
  const { selectedSample, selectedType, currentSimulationStep, simulationStates, isSimulating } = useAutomata();
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!graphRef.current) return;

    // Clear previous visualization
    graphRef.current.innerHTML = '';

    const automaton = getCurrentAutomaton(selectedSample, selectedType);
    
    if (selectedType === 'CFG') {
      if (graphRef.current) {
        const productions = (automaton as any).productions;
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
          <div class="p-4 font-mono text-sm space-y-2 min-h-[384px]">
            ${formattedProductions.map(prod => `<div>${prod}</div>`).join('')}
          </div>
        `;
      }
      return;
    }

    const highlightedState = isSimulating && simulationStates.length > 0 
      ? simulationStates[currentSimulationStep] 
      : undefined;
      
    const dotGraph = generateDotGraph(automaton as any, highlightedState, '#000000');

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
        });
    } catch (error) {
      console.error('Error rendering graph:', error);
    }
  }, [selectedSample, selectedType, currentSimulationStep, simulationStates, isSimulating]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">Visualization</h2>
      <div className="border border-gray-300 rounded-lg bg-white p-4 shadow-sm">
        <div 
          ref={graphRef} 
          className={`w-full ${selectedType === 'PDA' ? 'h-[800px]' : selectedType === 'CFG' ? 'h-auto' : 'h-96'}`}
        />
      </div>
    </div>
  );
};

export default Visualization;