export interface CourseFrontmatter {
  title: string;
  slug: string;
  summary: string;
  level: "Inicial" | "Intermedio" | "Avanzado";
  priceCLP: number;
  hoursPerWeek: number;
  syllabus: Array<{ title: string; description: string }>;
  image?: string;
}

export interface Course extends CourseFrontmatter {
  body: string;
}

export interface BlogFrontmatter {
  title: string;
  date: string;
  author: string;
  tags?: string[];
  cover?: string;
}

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  body: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo?: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface PageBlock {
  heading: string;
  content: string;
}

export interface PageEntry {
  id: string;
  title: string;
  blocks: PageBlock[];
}
