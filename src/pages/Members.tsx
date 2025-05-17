import React from 'react';
import { School, Users, Github, Mail, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Members: React.FC = () => {
  const members = [
    {
      name: "Jacob Nicolas",
      role: "Team Leader",
      description: "Specializes in automata theory and formal languages. Leads the team in developing efficient algorithms for DFA, CFG, and PDA implementations.",
      github: "gabzy-works",
      email: "gab@example.com",
      website: "secret",
      image: "/images/Jacob1.jpg",
    },
    {
      name: "Christian Paul Cabrera",
      role: "Developer",
      description: "Frontend specialist focusing on visualization algorithms and user interface design. Expert in React and D3.js for graph rendering.",
      github: "",
      email: "jth@example.com",
      website: "secret",
      image: "/images/Ian.jpg",
    },
    {
      name: "Stephen Leanillo",
      role: "Developer",
      description: "Backend developer with expertise in computational theory. Implements core algorithms for automata validation and testing.",
      github: "",
      email: "example.com",
      website: "secret",
      image: "/images/Leanillo.jpg",
    },
    {
      name: "Juan Miguel Luyao",
      role: "Developer",
      description: "Full-stack developer specializing in state machine implementations and optimization algorithms for automata processing.",
      github: "",
      email: "s@example.com",
      website: "secret",
      image: "/images/Luyao.jpg",
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Institution Info */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <School className="w-8 h-8 text-gray-700" />
          <h1 className="text-3xl font-bold text-gray-800">
            De La Salle University - Dasmariñas
          </h1>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Users className="w-6 h-6 text-gray-700" />
          <p className="text-xl text-gray-600">Bachelor of Science in Computer Science - Section 33</p>
        </div>
      </motion.div>

      {/* Team Members */}
      <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {members.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <div className="relative group">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6 flex-grow">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{member.name}</h2>
              <p className="text-gray-600 font-medium mb-4">{member.role}</p>
              <p className="text-gray-600 text-sm mb-4">{member.description}</p>
            </div>
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center justify-center gap-4 text-gray-500">
                {member.github && (
                  <a href={`https://github.com/${member.github}`} className="hover:text-gray-700 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {member.email && (
                  <a href={`mailto:${member.email}`} className="hover:text-gray-700 transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                )}
                {member.website && member.website !== "secret" && (
                  <a href={`https://${member.website}`} className="hover:text-gray-700 transition-colors">
                    <Globe className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Members;