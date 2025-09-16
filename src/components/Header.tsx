type HeaderProps = {
  onContactClick: () => void;
};

const Header = ({ onContactClick }: HeaderProps) => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center">
        {/* Replace with your logo */}
        <span className="text-2xl font-bold text-blue-600">Aprende</span>
      </div>
      <nav className="hidden md:flex space-x-6">
        <a href="#about" className="text-gray-600 hover:text-blue-600">About Us</a>
        <a href="#programs" className="text-gray-600 hover:text-blue-600">Programs</a>
        <a href="#testimonials" className="text-gray-600 hover:text-blue-600">Testimonials</a>
      </nav>
      <button
        onClick={onContactClick}
        className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
      >
        Contact Us
      </button>
    </header>
  );
};
export default Header;
