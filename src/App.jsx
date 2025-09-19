import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Events from "./pages/Events";
import EventPage from './pages/EventPage';
import ParticlesComponent from './components/Particles';

function App() {
  return (
    <Router>
      {/* Keep Particles always in the background */}
      <ParticlesComponent id="particles" />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/events" element={<Events />} />
        <Route path="/eventpage" element={<EventPage />} />
      </Routes>
    </Router>
  );
}

export default App;
