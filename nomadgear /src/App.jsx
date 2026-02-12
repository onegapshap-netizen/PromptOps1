import { useEffect } from 'react';
import Lenis from 'lenis';
import './styles/global.css';
import Hero from './sections/Hero';
import Navbar from './components/Navbar';
import Categories from './sections/Categories';
import About from './sections/About';
import Products from './sections/Products';
import Destinations from './sections/Destinations';
import Testimonials from './sections/Testimonials';
import CTA from './sections/CTA';
import Footer from './sections/Footer';

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Categories />
      <About />
      <Products />
      <Destinations />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
