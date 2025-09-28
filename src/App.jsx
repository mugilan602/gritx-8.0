import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Events from './pages/Events';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Particles from './components/Particles';
import { useSectionContext } from './context/SectionContext.jsx';
import AnimatedEventPage from './components/AnimatedEventPage.jsx';
import EventPage from './pages/EventPage.jsx';

function App() {
  const { heroSectionRef, aboutSectionRef, footerRef } = useSectionContext();

  return (
    <div className='bg-black'>
      <Particles />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Landing heroSectionRef={heroSectionRef} aboutSectionRef={aboutSectionRef} />} />
          <Route path="/events" element={<Events />} />
          <Route path="/eventpage" element={<EventPage />} />
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
