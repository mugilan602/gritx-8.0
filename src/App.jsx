import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Events from './pages/Events';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Particles from './components/Particles';
import ScrollToTop from './components/ScrollToTop';
import { useSectionContext } from './context/SectionContext.jsx';
import AnimatedEventPage from './components/AnimatedEventPage.jsx';
import EventPage from './pages/EventPage.jsx';
import DynamicEventPage from './pages/DynamicEventPage.jsx';
import Carousel from './components/Carousel.jsx';
import PerspectiveCarousel from './components/Carousel.jsx';

function App() {
  const { heroSectionRef, aboutSectionRef, footerRef } = useSectionContext();
  const carouselItems = [
    {
      id: 1,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      title: 'React',
      description: 'A JavaScript library for building user interfaces.'
    },
    {
      id: 2,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
      title: 'Vue.js',
      description: 'The progressive framework for building web UIs.'
    },
    {
      id: 3,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
      title: 'Angular',
      description: 'A platform for building mobile and desktop web applications.'
    },
    {
      id: 4,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg',
      title: 'Svelte',
      description: 'Cybernetically enhanced web apps.'
    },
    {
      id: 5,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      title: 'Node.js',
      description: 'A JavaScript runtime built on Chrome\'s V8 engine.'
    }
  ];

  return (
    <div className='bg-black'>
      <Particles />
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Landing heroSectionRef={heroSectionRef} aboutSectionRef={aboutSectionRef} />} />
          <Route path="/events" element={<Events />} />
          <Route path="/eventpage" element={<EventPage />} />

          {/* Dynamic Event Routes */}
          <Route path="/projectrix" element={<DynamicEventPage />} />
          <Route path="/code2cosmos" element={<DynamicEventPage />} />
          <Route path="/roll-and-rule" element={<DynamicEventPage />} />
          <Route path="/script2screen" element={<DynamicEventPage />} />
          <Route path="/huntxcape" element={<DynamicEventPage />} />
          <Route path="/jockey-junction" element={<DynamicEventPage />} />
          <Route path="/sportsera" element={<DynamicEventPage />} />
          <Route path="/e-football" element={<DynamicEventPage />} />
          <Route path="/cinimax" element={<DynamicEventPage />} />
          <Route path="/campus-ambassador" element={<DynamicEventPage />} />
          <Route path="/frozen-frames" element={<DynamicEventPage />} />
          <Route path="/design-dash" element={<DynamicEventPage />} />
          <Route path="/the-debate-saga" element={<DynamicEventPage />} />
          <Route path="/web-vibe" element={<DynamicEventPage />} />
          <Route path="/bug-blaze" element={<DynamicEventPage />} />
          <Route path="/the-reel-showdown" element={<DynamicEventPage />} />
          <Route path="/mini-hackathon" element={<DynamicEventPage />} />
          <Route path="/cine-spark" element={<DynamicEventPage />} />
          <Route path="/paper-presentation" element={<DynamicEventPage />} />

          {/* Alternative: Single dynamic route (choose one approach) */}
          {/* <Route path="/event/:slug" element={<DynamicEventPage />} /> */}

          <Route path="/carousel" element={<div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundImage: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
            fontFamily: "'Montserrat', sans-serif"
          }}>
            <PerspectiveCarousel items={carouselItems} />
          </div>} />
          {/* other routes */}
        </Routes>
      </main>
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
