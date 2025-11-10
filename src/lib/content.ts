import matter from "gray-matter";

import type {
  BlogPost,
  Course,
  CourseFrontmatter,
  FaqEntry,
  PageEntry,
  TeamMember
} from "../types/content";

const parseMarkdown = <T extends Record<string, unknown>>(raw: string) => {
  const { data, content } = matter(raw);
  return { data: data as T, content };
};

const loadCollection = <T extends Record<string, unknown>>(
  modules: Record<string, { default: string }> | Record<string, string>
) =>
  Object.entries(modules).map(([path, module]) => {
    const raw = typeof module === "string" ? module : module.default;
    const { data, content } = parseMarkdown<T>(raw);
    return { path, data, content };
  });

export const getCourses = (): Course[] => {
  const modules = import.meta.glob("/content/courses/*.md", { eager: true, as: "raw" });
  return loadCollection<CourseFrontmatter>(modules).map(({ data, content }) => ({
    ...(data as CourseFrontmatter),
    body: content.trim()
  }));
};

export const getCourseBySlug = (slug: string): Course | undefined =>
  getCourses().find((course) => course.slug === slug);

export const getBlogPosts = (): BlogPost[] => {
  const modules = import.meta.glob("/content/blog/*.md", { eager: true, as: "raw" });
  return loadCollection<BlogPost>(modules)
    .map(({ data, content }) => ({
      ...(data as BlogPost),
      body: content.trim()
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined =>
  getBlogPosts().find((post) => post.slug === slug);

export const getTeamMembers = (): TeamMember[] => {
  const modules = import.meta.glob("/content/team/*.md", { eager: true, as: "raw" });
  return loadCollection<TeamMember>(modules).map(({ data }) => data as TeamMember);
};

export const getFaqEntries = (): FaqEntry[] => {
  const modules = import.meta.glob("/content/faqs/*.md", { eager: true, as: "raw" });
  return loadCollection<FaqEntry>(modules).map(({ data }) => data as FaqEntry);
};

export const getPages = (): PageEntry[] => {
  const modules = import.meta.glob("/content/pages/*.md", { eager: true, as: "raw" });
  return loadCollection<PageEntry>(modules).map(({ data }) => data as PageEntry);
};

export const getPageById = (id: string): PageEntry | undefined =>
  getPages().find((page) => page.id === id);
