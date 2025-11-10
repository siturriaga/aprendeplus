import { lazy, Suspense, type ReactNode } from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { RootLayout } from "./components/layout/RootLayout";
import { LoadingScreen } from "./components/molecules/LoadingScreen";

const HomePage = lazy(() => import("./routes/Home"));
const CoursesPage = lazy(() => import("./routes/Courses"));
const CourseDetailPage = lazy(() => import("./routes/CourseDetail"));
const PricingPage = lazy(() => import("./routes/Pricing"));
const AboutPage = lazy(() => import("./routes/About"));
const BlogPage = lazy(() => import("./routes/Blog"));
const BlogPostPage = lazy(() => import("./routes/BlogPost"));
const ContactPage = lazy(() => import("./routes/Contact"));
const NotFoundPage = lazy(() => import("./routes/NotFound"));

const withSuspense = (node: ReactNode) => (
  <Suspense fallback={<LoadingScreen />}>{node}</Suspense>
);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route index element={withSuspense(<HomePage />)} />
      <Route path="courses" element={withSuspense(<CoursesPage />)} />
      <Route path="courses/:slug" element={withSuspense(<CourseDetailPage />)} />
      <Route path="pricing" element={withSuspense(<PricingPage />)} />
      <Route path="about" element={withSuspense(<AboutPage />)} />
      <Route path="blog" element={withSuspense(<BlogPage />)} />
      <Route path="blog/:slug" element={withSuspense(<BlogPostPage />)} />
      <Route path="contact" element={withSuspense(<ContactPage />)} />
      <Route path="*" element={withSuspense(<NotFoundPage />)} />
    </Route>
  )
);
