const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Aprende Institute. All Rights Reserved.</p>
        <div className="mt-4">
          {/* Add social media links here later */}
          <a href="#" className="text-gray-400 hover:text-white mx-2">Facebook</a>
          <a href="#" className="text-gray-400 hover:text-white mx-2">Twitter</a>
          <a href="#" className="text-gray-400 hover:text-white mx-2">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
