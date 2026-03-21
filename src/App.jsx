import { useState } from 'react';
import Splash    from './components/Splash';
import Cursor    from './components/Cursor';
import ScanBeam  from './components/ScanBeam';
import Navbar    from './components/Navbar';
import Hero      from './components/Hero';
import About     from './components/About';
import Skills    from './components/Skills';
import Projects  from './components/Projects';
import Contact   from './components/Contact';
import Footer    from './components/Footer';
import './App.css';

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <>
      {/* Splash — shown until boot sequence completes */}
      {!ready && <Splash onComplete={() => setReady(true)} />}

      {/* Main site — fades in after splash */}
      <div className={`site ${ready ? 'site--visible' : ''}`}>
        <div className="hex-grid"  aria-hidden />
        <div className="corner-tl" aria-hidden />
        <div className="corner-br" aria-hidden />
        <Cursor />
        {ready && <ScanBeam />}
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
