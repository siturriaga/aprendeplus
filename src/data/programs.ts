// Defines the structure of a single program
export interface Program {
  id: number;
  level: string;
  title: string;
  description: string;
}

// An array of all available programs
export const programs: Program[] = [
  {
    id: 1,
    level: "A1",
    title: "Beginner English",
    description: "Build a solid foundation. Learn basic greetings, introductions, and essential vocabulary for everyday situations.",
  },
  {
    id: 2,
    level: "A2",
    title: "Elementary English",
    description: "Expand your conversational skills. Discuss your daily routine, hobbies, and make simple plans.",
  },
  {
    id: 3,
    level: "B1",
    title: "Intermediate English",
    description: "Gain confidence in discussions. Express opinions, share experiences, and handle most travel situations.",
  },
  {
    id: 4,
    level: "B2",
    title: "Upper-Intermediate English",
    description: "Achieve fluency and spontaneity. Understand complex texts and engage in detailed, professional conversations.",
  },
];
