import { siteContent } from "../data/content";

const EnglishTest = () => {
  return (
    <section id="englishtest" className="py-16 px-4 bg-white text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{siteContent.englishTest.title}</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-8">{siteContent.englishTest.description}</p>
      <button className="bg-green-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-600 transition duration-300">
        {siteContent.englishTest.cta}
      </button>
    </section>
  );
};
export default EnglishTest;
