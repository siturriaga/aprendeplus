import { siteContent } from "../data/content";

const About = () => {
  return (
    <section id="about" className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{siteContent.about.title}</h2>
        <p className="text-gray-600 leading-relaxed">{siteContent.about.description}</p>
      </div>
    </section>
  );
};
export default About;
