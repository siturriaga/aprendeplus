import { programs } from "../data/programs";

const Programs = () => {
  return (
    <section id="programs" className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program) => (
            <div key={program.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
              <span className="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full self-start mb-2">
                {program.level}
              </span>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{program.title}</h3>
              <p className="text-gray-600 flex-grow">{program.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Programs;
