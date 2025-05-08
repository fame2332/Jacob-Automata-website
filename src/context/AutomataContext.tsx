import React, { createContext, useState, useContext, ReactNode } from 'react';
import { DFA, PDA, CFG, DFA_1, DFA_2, CFG_1, CFG_2, PDA_1, PDA_2 } from '../automata';

export type AutomataType = 'DFA' | 'CFG' | 'PDA';
export type SampleType = 'sample1' | 'sample2';

interface AutomataContextType {
  selectedSample: SampleType;
  setSelectedSample: (sample: SampleType) => void;
  selectedType: AutomataType;
  setSelectedType: (type: AutomataType) => void;
  validateInput: string;
  setValidateInput: (input: string) => void;
  simulationStates: string[];
  setSimulationStates: (states: string[]) => void;
  currentSimulationStep: number;
  setCurrentSimulationStep: (step: number) => void;
  isSimulating: boolean;
  setIsSimulating: (isSimulating: boolean) => void;
  currentRegex: string;
}

const sampleRegexes = {
  sample1: '(aa+bb)(aba+bab+bbb)(a+b)*(aa+bb)(aa+bb)*(ab*ab*a)(ab*ab*a)*(bbb+aaa)(a+b)*',
  sample2: '(1*01*01*)(11+00)(10+01)*(1+0)(11+00)(1+0+11+00+101+111+000)(11+00)*(10*10*1)(11+00)*'
};

const AutomataContext = createContext<AutomataContextType | undefined>(undefined);

export const AutomataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedSample, setSelectedSample] = useState<SampleType>('sample1');
  const [selectedType, setSelectedType] = useState<AutomataType>('DFA');
  const [validateInput, setValidateInput] = useState<string>('');
  const [simulationStates, setSimulationStates] = useState<string[]>([]);
  const [currentSimulationStep, setCurrentSimulationStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Get current regex based on selected sample
  const currentRegex = sampleRegexes[selectedSample];
  
  const value = {
    selectedSample,
    setSelectedSample,
    selectedType,
    setSelectedType,
    validateInput,
    setValidateInput,
    simulationStates,
    setSimulationStates,
    currentSimulationStep,
    setCurrentSimulationStep,
    isSimulating,
    setIsSimulating,
    currentRegex
  };

  return <AutomataContext.Provider value={value}>{children}</AutomataContext.Provider>;
};

export const useAutomata = () => {
  const context = useContext(AutomataContext);
  if (context === undefined) {
    throw new Error('useAutomata must be used within an AutomataProvider');
  }
  return context;
};

export const getCurrentAutomaton = (sample: SampleType, type: AutomataType) => {
  if (type === 'DFA') {
    return sample === 'sample1' ? DFA_1 : DFA_2;
  } else if (type === 'CFG') {
    return sample === 'sample1' ? CFG_1 : CFG_2;
  } else {
    return sample === 'sample1' ? PDA_1 : PDA_2;
  }
};