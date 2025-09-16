import { testimonials } from "../data/testimonials";

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 px-4 bg-blue-600 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
        <div className="space-y-8">
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.id} className="bg-blue-700 rounded-lg p-6">
              <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
              <cite className="font-semibold not-italic">- {testimonial.author}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
