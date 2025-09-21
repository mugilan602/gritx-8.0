import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Events from "./pages/Events";
import EventPage from './pages/EventPage';
import ParticlesComponent from './components/Particles';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      {/* Keep Particles always in the background */}
      <ParticlesComponent id="particles" />

      {/* Navbar with sticky behavior */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/events" element={<Events />} />
        <Route path="/eventpage" element={<EventPage />} />
      </Routes>

      {/* Footer appears on all pages */}
      <Footer />
    </Router>
  );
}

export default App;
