import { useState } from 'react';
// Path updated because both files are in the same 'components' folder
import { useAccessibility } from './AccessibilityContext';

const A11yPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { increaseFontSize, decreaseFontSize, toggleHighContrast, highContrast } = useAccessibility();

  const AccessibilityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className={`bg-white p-4 rounded-lg shadow-xl border transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <h4 className="font-bold text-gray-800 text-md mb-3">Accessibility Controls</h4>
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-700">Font Size</span>
          <div className="flex space-x-2">
            <button onClick={decreaseFontSize} className="font-bold text-lg bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center">-</button>
            <button onClick={increaseFontSize} className="font-bold text-lg bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center">+</button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-700">High Contrast</span>
          <button onClick={toggleHighContrast} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${highContrast ? 'bg-blue-600' : 'bg-gray-300'}`}>
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${highContrast ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="mt-2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label="Toggle Accessibility Panel"
      >
        <AccessibilityIcon />
      </button>
    </div>
  );
};
export default A11yPanel;
