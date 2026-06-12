// src/App.js
// Router, persistent layout, page transitions. Routes are lazy? — no, the
// site is small enough that direct imports are clearer than code-splitting.
// CommandPalette is mounted at the top level so it survives route changes.

import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import TopNav from "./components/layout/TopNav";
import Footer from "./components/layout/Footer";
import ThemeToggle from "./components/layout/ThemeToggle";
import ScrollToTopButton from "./components/layout/ScrollToTopButton";
import PageShell, { ScrollToTop } from "./components/layout/PageShell";
import CommandPalette from "./components/layout/CommandPalette";
import { pageTransition } from "./lib/motion";

import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Achievements from "./pages/Achievements";
import Experience from "./pages/Experience";
import Education from "./pages/Education";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <TopNav />
      <ThemeToggle />
      <ScrollToTopButton />
      <CommandPalette />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransition}
        >
          <PageShell>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:projectName" element={<ProjectDetail />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/education" element={<Education />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageShell>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
