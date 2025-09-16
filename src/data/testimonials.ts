export interface Testimonial {
  id: number;
  quote: string;
  author: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "The B1 course was fantastic! I finally feel confident speaking with my international colleagues. The instructors are amazing.",
    author: "Maria S., Project Manager",
  },
  {
    id: 2,
    quote: "I started from zero and the beginner course made everything so easy to understand. I highly recommend Aprende Institute!",
    author: "Carlos G., Student",
  },
  {
    id: 3,
    quote: "Aprende's flexible schedule allowed me to improve my English while working full-time. The platform is excellent.",
    author: "Ana L., Software Developer",
  },
];
