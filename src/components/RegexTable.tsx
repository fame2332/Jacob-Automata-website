import React from 'react';
import { useAutomata, SampleType, AutomataType } from '../context/AutomataContext';

const RegexTable: React.FC = () => {
  const { 
    selectedSample, 
    setSelectedSample, 
    selectedType, 
    setSelectedType
  } = useAutomata();

  const handleSampleClick = (sample: SampleType) => {
    setSelectedSample(sample);
  };

  const handleTypeClick = (type: AutomataType) => {
    setSelectedType(type);
  };

  const regexStrings = {
    sample1: '(aa+bb)(aba+bab+bbb)(a+b)*(aa+bb)(aa+bb)*(ab*ab*a)(ab*ab*a)*(bbb+aaa)(a+b)*',
    sample2: '(1*01*01*)(11+00)(10+01)*(1+0)(11+00)(1+0+11+00+101+111+000)(11+00)*(10*10*1)(11+00)*'
  };

  return (
    <div className="overflow-x-auto shadow-md rounded-lg mt-4">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b w-2/3 text-left font-semibold text-gray-700">REGEX</th>
            <th className="py-2 px-4 border-b border-l text-center font-semibold text-gray-700">DFA</th>
            <th className="py-2 px-4 border-b border-l text-center font-semibold text-gray-700">CFG</th>
            <th className="py-2 px-4 border-b border-l text-center font-semibold text-gray-700">PDA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-3 px-4 border-b font-mono text-sm break-all">
              {regexStrings.sample1}
            </td>
            <td className="py-3 px-4 border-b border-l text-center">
              <button 
                className={`px-3 py-1 rounded-md transition ${
                  selectedSample === 'sample1' && selectedType === 'DFA' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                onClick={() => {
                  handleSampleClick('sample1');
                  handleTypeClick('DFA');
                }}
              >
                View
              </button>
            </td>
            <td className="py-3 px-4 border-b border-l text-center">
              <button 
                className={`px-3 py-1 rounded-md transition ${
                  selectedSample === 'sample1' && selectedType === 'CFG' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                onClick={() => {
                  handleSampleClick('sample1');
                  handleTypeClick('CFG');
                }}
              >
                View
              </button>
            </td>
            <td className="py-3 px-4 border-b border-l text-center">
              <button 
                className={`px-3 py-1 rounded-md transition ${
                  selectedSample === 'sample1' && selectedType === 'PDA' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                onClick={() => {
                  handleSampleClick('sample1');
                  handleTypeClick('PDA');
                }}
              >
                View
              </button>
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="py-3 px-4 border-b font-mono text-sm break-all">
              {regexStrings.sample2}
            </td>
            <td className="py-3 px-4 border-b border-l text-center">
              <button 
                className={`px-3 py-1 rounded-md transition ${
                  selectedSample === 'sample2' && selectedType === 'DFA' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                onClick={() => {
                  handleSampleClick('sample2');
                  handleTypeClick('DFA');
                }}
              >
                View
              </button>
            </td>
            <td className="py-3 px-4 border-b border-l text-center">
              <button 
                className={`px-3 py-1 rounded-md transition ${
                  selectedSample === 'sample2' && selectedType === 'CFG' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                onClick={() => {
                  handleSampleClick('sample2');
                  handleTypeClick('CFG');
                }}
              >
                View
              </button>
            </td>
            <td className="py-3 px-4 border-b border-l text-center">
              <button 
                className={`px-3 py-1 rounded-md transition ${
                  selectedSample === 'sample2' && selectedType === 'PDA' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                onClick={() => {
                  handleSampleClick('sample2');
                  handleTypeClick('PDA');
                }}
              >
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RegexTable;