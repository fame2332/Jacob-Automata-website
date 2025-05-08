import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code, GitBranch, BookOpen, Shield, Zap } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Automata Visualization",
      description: "Interactive visualizations for DFA, CFG, and PDA with real-time updates and smooth transitions."
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "String Validation",
      description: "Validate strings against different automata types with step-by-step simulation and detailed feedback."
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: "Multiple Samples",
      description: "Explore various pre-configured automata samples to understand different concepts and patterns."
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Educational Focus",
      description: "Designed to help students understand automata theory through practical examples and visual learning."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Reliable",
      description: "Built with modern security practices and reliable algorithms for accurate automata processing."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Performance Optimized",
      description: "Efficient algorithms and optimized rendering for smooth performance even with complex automata."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">About the Project</h1>
        
        <div className="prose prose-lg mx-auto mb-12">
          <p className="text-gray-600 text-center mb-8">
            The Automata Project is an educational tool designed to help students understand and visualize 
            different types of automata, including Deterministic Finite Automata (DFA), Context-Free Grammars (CFG), 
            and Pushdown Automata (PDA). Our goal is to make learning automata theory more accessible and engaging 
            through interactive visualizations and practical examples.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-gray-700 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Project Goals</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Provide an intuitive interface for learning automata theory</li>
            <li>Enable interactive exploration of different automata types</li>
            <li>Support step-by-step validation of strings</li>
            <li>Offer multiple sample configurations for learning</li>
            <li>Create an engaging educational experience</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default About; 