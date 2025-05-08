import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-gray-700" />
            <span className="text-xl font-semibold text-gray-800">Automata Project</span>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link 
                  to="/" 
                  className={`text-gray-600 hover:text-gray-900 transition-colors ${
                    isActive('/') ? 'font-semibold text-gray-900' : ''
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className={`text-gray-600 hover:text-gray-900 transition-colors ${
                    isActive('/about') ? 'font-semibold text-gray-900' : ''
                  }`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/members" 
                  className={`text-gray-600 hover:text-gray-900 transition-colors ${
                    isActive('/members') ? 'font-semibold text-gray-900' : ''
                  }`}
                >
                  Members
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className={`text-gray-600 hover:text-gray-900 transition-colors ${
                    isActive('/contact') ? 'font-semibold text-gray-900' : ''
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;