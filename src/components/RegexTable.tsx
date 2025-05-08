import React from 'react';
import { useAutomata, SampleType, AutomataType } from '../context/AutomataContext';
import { motion } from 'framer-motion';
import { Eye, CheckCircle2 } from 'lucide-react';

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

  const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={tableVariants}
      className="mt-6"
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
              <th className="py-4 px-6 text-left font-semibold text-gray-700 w-2/3">REGEX</th>
              <th className="py-4 px-6 text-center font-semibold text-gray-700">DFA</th>
              <th className="py-4 px-6 text-center font-semibold text-gray-700">CFG</th>
              <th className="py-4 px-6 text-center font-semibold text-gray-700">PDA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <motion.tr variants={rowVariants} className="hover:bg-gray-50 transition-colors">
              <td className="py-4 px-6 align-top">
                <div className="font-mono text-sm bg-gray-50 p-3 rounded-lg border border-gray-200 break-words whitespace-pre-line">
                  {regexStrings.sample1}
                </div>
              </td>
              {['DFA', 'CFG', 'PDA'].map((type) => (
                <td key={type} className="py-4 px-6 text-center">
                  <button 
                    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      selectedSample === 'sample1' && selectedType === type
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => {
                      handleSampleClick('sample1');
                      handleTypeClick(type as AutomataType);
                    }}
                  >
                    {selectedSample === 'sample1' && selectedType === type ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                    <span>View</span>
                  </button>
                </td>
              ))}
            </motion.tr>
            <motion.tr variants={rowVariants} className="hover:bg-gray-50 transition-colors">
              <td className="py-4 px-6 align-top">
                <div className="font-mono text-sm bg-gray-50 p-3 rounded-lg border border-gray-200 break-words whitespace-pre-line">
                  {regexStrings.sample2}
                </div>
              </td>
              {['DFA', 'CFG', 'PDA'].map((type) => (
                <td key={type} className="py-4 px-6 text-center">
                  <button 
                    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      selectedSample === 'sample2' && selectedType === type
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => {
                      handleSampleClick('sample2');
                      handleTypeClick(type as AutomataType);
                    }}
                  >
                    {selectedSample === 'sample2' && selectedType === type ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                    <span>View</span>
                  </button>
                </td>
              ))}
            </motion.tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default RegexTable;