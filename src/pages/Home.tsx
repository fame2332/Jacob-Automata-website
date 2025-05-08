import React from 'react';
import RegexTable from '../components/RegexTable';
import Visualization from '../components/Visualization';
import ValidateSection from '../components/ValidateSection';

const Home: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-6">
      <RegexTable />
      <Visualization />
      <ValidateSection />
    </main>
  );
};

export default Home;