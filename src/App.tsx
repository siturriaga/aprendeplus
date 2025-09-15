import React from 'react';
import Header from './components/Header'; // Import the new Header component

const App: React.FC = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      <Header />
      <main>
        {/* The other page sections (Hero, About, Programs, etc.) 
          will be imported and placed here in the future.
        */}
      </main>
    </div>
  );
};

export default App;
