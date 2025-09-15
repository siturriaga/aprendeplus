import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div>
          <a href="#">
            <img 
              src="/aprende_logo.png" 
              alt="Aprende Institute Logo" 
              className="h-10" 
            />
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#about" className="text-gray-600 hover:text-blue-500">About Us</a>
          <a href="#programs" className="text-gray-600 hover:text-blue-500">Programs</a>
          <a href="#testimonials" className="text-gray-600 hover:text-blue-500">Testimonials</a>
          <a href="#englishtest" className="text-gray-600 hover:text-blue-500">English Test</a>
        </div>

        {/* Contact Button */}
        <div>
          <a 
            href="#contact" 
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
