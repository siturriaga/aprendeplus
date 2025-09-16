import { siteContent } from "../data/content";

const Hero = () => {
  return (
    <section className="bg-gray-100 text-center py-20 px-4">
      {/* You can add your background.png here using CSS */}
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4">{siteContent.hero.title}</h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">{siteContent.hero.subtitle}</p>
      <a
        href="#englishtest"
        className="bg-green-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-600 transition duration-300"
      >
        {siteContent.hero.cta}
      </a>
    </section>
  );
};
export default Hero;
