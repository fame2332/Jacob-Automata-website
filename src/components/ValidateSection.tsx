import React, { useState } from 'react';
import { validateString, StateCheck } from '../automata';
import { useAutomata, getCurrentAutomaton } from '../context/AutomataContext';
import { Play, Pause, ChevronLeft, ChevronRight, X } from 'lucide-react';

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
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">Validate Strings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-gray-300 rounded-lg bg-white p-4 shadow-sm">
          <textarea
            className="w-full h-60 p-3 border border-gray-300 rounded-md font-mono text-sm"
            placeholder={`Enter strings to validate, one per line\nFor example: ${getExampleString()}`}
            value={validateInput}
            onChange={(e) => {
              setValidateInput(e.target.value);
              setError(null);
            }}
          />
          
          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => setError(null)} className="text-red-600 hover:text-red-800">
                <X size={16} />
              </button>
            </div>
          )}
          
          <div className="mt-3">
            <button
              className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
              onClick={handleValidate}
            >
              Validate
            </button>
          </div>
        </div>
        
        <div className="border border-gray-300 rounded-lg bg-white p-4 shadow-sm">
          {selectedResult && selectedResult.stateChecks && (
            <div className="mb-4">
              <div className="p-3 rounded-md bg-gray-100 border border-gray-300">
                <div className="flex justify-between items-center mb-2">
                  <span className={`font-semibold ${selectedResult.isValid ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedResult.isValid ? 'Valid' : 'Invalid'} String: {selectedResult.input}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={handlePrevStep}
                      disabled={currentSimulationStep === 0}
                      className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={togglePlay}
                      className="p-1 rounded hover:bg-gray-200"
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <button
                      onClick={handleNextStep}
                      disabled={currentSimulationStep === (selectedResult.stateChecks?.length ?? 0) - 1}
                      className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
                <div className="text-sm">
                  <div>Current State: <span className="font-mono">{
                    selectedResult.stateChecks[currentSimulationStep]?.state || 'N/A'
                  }</span></div>
                  <div>Step: {currentSimulationStep + 1} of {selectedResult.stateChecks.length}</div>
                </div>
              </div>
            </div>
          )}
          
          <h3 className="font-medium text-gray-700 mb-2">Result History</h3>
          <div className="h-40 overflow-y-auto">
            {results.map((result, index) => (
              <div 
                key={index} 
                className={`p-2 mb-1 rounded-md text-sm flex justify-between items-center bg-gray-50 border border-gray-200`}
              >
                <span>
                  <span className="font-mono">{result.input}</span>: 
                  <span className={`ml-2 font-semibold ${result.isValid ? 'text-green-600' : 'text-red-600'}`}>
                    {result.isValid ? 'Valid' : 'Invalid'}
                  </span>
                </span>
                {result.stateChecks && (
                  <button 
                    className="text-xs bg-black text-white px-2 py-0.5 rounded hover:bg-gray-800"
                    onClick={() => handleSimulate(result)}
                  >
                    Simulate
                  </button>
                )}
              </div>
            ))}
            {results.length === 0 && (
              <div className="text-gray-500 text-sm italic">No validation results yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidateSection;