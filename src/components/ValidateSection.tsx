import React, { useState } from 'react';
import { validateString, StateCheck } from '../automata';
import { useAutomata, getCurrentAutomaton } from '../context/AutomataContext';
import { Play, Pause, ChevronLeft, ChevronRight, X, CheckCircle2, XCircle, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ValidateSection: React.FC = () => {
  const { 
    selectedSample, 
    selectedType, 
    validateInput, 
    setValidateInput,
    setSimulationStates,
    currentSimulationStep,
    setCurrentSimulationStep,
    setIsSimulating,
    simulationStates,
  } = useAutomata();
  
  const [results, setResults] = useState<{ input: string; isValid: boolean; stateChecks?: StateCheck[] }[]>([]);
  const [selectedResult, setSelectedResult] = useState<{ input: string; isValid: boolean; stateChecks?: StateCheck[] } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && selectedResult?.stateChecks) {
      interval = setInterval(() => {
        setCurrentSimulationStep(step => {
          if (step >= selectedResult.stateChecks!.length - 1) {
            setIsPlaying(false);
            return step;
          }
          return step + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, selectedResult]);

  const validateInputString = (input: string, alphabet: string[]): boolean => {
    const validChars = new Set(alphabet);
    return input.split('').every(char => validChars.has(char));
  };

  const handleValidate = () => {
    if (!validateInput.trim() || selectedType !== 'DFA') return;
    
    setError(null);
    setResults([]);
    setSelectedResult(null);
    setSimulationStates([]);
    setCurrentSimulationStep(0);
    setIsSimulating(false);
    setIsPlaying(false);
    
    const inputs = validateInput.split('\n').filter(line => line.trim());
    const automaton = getCurrentAutomaton(selectedSample, selectedType);
    const alphabet = (automaton as any).alphabet;
    
    // Check for invalid characters
    const invalidInputs = inputs.filter(input => !validateInputString(input, alphabet));
    if (invalidInputs.length > 0) {
      setError(`Invalid characters found. Only ${alphabet.join(', ')} are allowed.`);
      return;
    }
    
    inputs.forEach(input => {
      const result = validateString(automaton as any, input);
      setResults(prev => [...prev, { input, isValid: result.isValid, stateChecks: result.stateChecks }]);
    });
  };

  const handleSimulate = (result: { input: string; isValid: boolean; stateChecks?: StateCheck[] }) => {
    setValidateInput(result.input);
    setSelectedResult(result);
    if (result.stateChecks) {
      setSimulationStates(result.stateChecks.map(check => check.state));
      setCurrentSimulationStep(0);
      setIsSimulating(true);
      setIsPlaying(false);
    }
  };

  const handlePrevStep = () => {
    setCurrentSimulationStep(step => Math.max(0, step - 1));
  };

  const handleNextStep = () => {
    if (selectedResult?.stateChecks) {
      setCurrentSimulationStep(step => Math.min(selectedResult.stateChecks!.length - 1, step + 1));
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  if (selectedType !== 'DFA') {
    return null;
  }

  const getExampleString = () => {
    if (selectedSample === 'sample1') {
      return 'aaababbaabbb';
    } else {
      return '1001101100';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Validate Strings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="relative">
            <textarea
              className="w-full h-60 p-4 border border-gray-200 rounded-lg font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
              placeholder={`Enter strings to validate, one per line\nFor example: ${getExampleString()}`}
              value={validateInput}
              onChange={(e) => {
                setValidateInput(e.target.value);
                setError(null);
              }}
            />
            
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center justify-between"
                >
                  <span>{error}</span>
                  <button 
                    onClick={() => setError(null)} 
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="mt-4">
            <button
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              onClick={handleValidate}
            >
              Validate Strings
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <AnimatePresence mode="wait">
            {selectedResult && selectedResult.stateChecks && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mb-6"
              >
                <div className="p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-2">
                      {selectedResult.isValid ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                      <span className={`font-semibold ${selectedResult.isValid ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedResult.isValid ? 'Valid' : 'Invalid'} String
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={handlePrevStep}
                        disabled={currentSimulationStep === 0}
                        className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={togglePlay}
                        className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                      </button>
                      <button
                        onClick={handleNextStep}
                        disabled={currentSimulationStep === (selectedResult.stateChecks?.length ?? 0) - 1}
                        className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="font-mono bg-gray-800 text-white p-2 rounded">
                      {selectedResult.input}
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <div>Current State: <span className="font-mono font-semibold">
                        {selectedResult.stateChecks[currentSimulationStep]?.state || 'N/A'}
                      </span></div>
                      <div>Step: {currentSimulationStep + 1} of {selectedResult.stateChecks.length}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <h3 className="font-medium text-gray-700 mb-3">Result History</h3>
          <div className="h-60 overflow-y-auto space-y-2 pr-2">
            <AnimatePresence>
              {results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-3 rounded-lg bg-gray-50 border border-gray-200 flex justify-between items-center group hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    {result.isValid ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                    <span className="font-mono">{result.input}</span>
                  </div>
                  {result.stateChecks && (
                    <button 
                      className="text-xs bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1.5 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-1 opacity-0 group-hover:opacity-100"
                      onClick={() => handleSimulate(result)}
                    >
                      <PlayCircle size={14} />
                      <span>Simulate</span>
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {results.length === 0 && (
              <div className="text-gray-500 text-sm italic text-center py-8">
                No validation results yet
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ValidateSection;