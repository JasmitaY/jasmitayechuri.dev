import Navigation from '@/components/Navigation';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <About />
      <Experience />
      <Projects />
      <Skills />
    </main>
  );
}
