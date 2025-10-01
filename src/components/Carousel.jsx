import React, { useState, useEffect } from 'react';
import { TiChevronLeftOutline, TiChevronRightOutline } from 'react-icons/ti';

// --- CSS Styles ---
// All styles are injected from this string, so no separate CSS file is needed.
const carouselStyles = `
  .perspective-carousel-container * {
    box-sizing: border-box;
  }

  .perspective-carousel-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }

  .carousel {
    position: relative;
    width: min(23rem, 90vw);
    height: min(23rem, 90vw);
    perspective: 500px;
    transform-style: preserve-3d;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .carousel {
      width: min(18rem, 85vw);
      height: min(18rem, 85vw);
      perspective: 400px;
    }
  }

  @media (max-width: 480px) {
    .carousel {
      width: min(16rem, 90vw);
      height: min(16rem, 90vw);
      perspective: 350px;
    }
  }

  .card-container {
    position: absolute;
    width: 100%;
    height: 100%;
    transform:
      rotateY(calc(var(--offset) * 50deg))
      scaleY(calc(1 + var(--abs-offset) * -0.4))
      translateZ(calc(var(--abs-offset) * -30rem))
      translateX(calc(var(--direction) * -5rem));
    filter: blur(calc(var(--abs-offset) * 1rem));
    transition: all 0.3s ease-out;
  }

  /* Mobile card container adjustments */
  @media (max-width: 768px) {
    .card-container {
      transform:
        rotateY(calc(var(--offset) * 40deg))
        scaleY(calc(1 + var(--abs-offset) * -0.3))
        translateZ(calc(var(--abs-offset) * -20rem))
        translateX(calc(var(--direction) * -3rem));
    }
  }

  .card {
    width: 100%;
    height: 100%;
    padding: 1.5rem;
    background: linear-gradient(135deg, 
      hsl(0deg, 0%, calc(95% - var(--abs-offset) * 20%)),
      hsl(0deg, 0%, calc(90% - var(--abs-offset) * 25%))
    );
    border: 1px solid hsl(0deg, 0%, calc(80% - var(--abs-offset) * 30%));
    border-radius: 1rem;
    color: #374151;
    text-align: center;
    transition: all 0.3s ease-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  /* Mobile card adjustments */
  @media (max-width: 768px) {
    .card {
      padding: 1rem;
      gap: 0.5rem;
    }
  }

  @media (max-width: 480px) {
    .card {
      padding: 0.75rem;
      gap: 0.4rem;
    }
  }

  .card .card-logo {
    width: 60px;
    height: 60px;
    object-fit: contain;
    flex-shrink: 0;
  }

  /* Mobile logo sizing */
  @media (max-width: 768px) {
    .card .card-logo {
      width: 75px;
      height: 75px;
    }
  }

  @media (max-width: 480px) {
    .card .card-logo {
      width: 80px;
      height: 80px;
    }
  }

  .card h2 {
    text-align: center;
    font-size: 1.75rem;
    font-weight: bold;
    font-family: 'Rye', cursive;
    letter-spacing: 0.2em;
    margin: 0;
    color: #000000;
    line-height: 1.2;
  }

  /* Mobile heading sizing */
  @media (max-width: 768px) {
    .card h2 {
      font-size: 1.5rem;
      letter-spacing: 0.15em;
    }
  }

  @media (max-width: 480px) {
    .card h2 {
      font-size: 1.25rem;
      letter-spacing: 0.1em;
    }
  }
  
  .card p {
    font-size: 1.1rem;
    margin: 0;
    flex-grow: 1;
    color: #4B5563;
  }

  /* Mobile paragraph sizing */
  @media (max-width: 768px) {
    .card p {
      font-size: 1rem;
      line-height: 1.4;
      letter-spacing: 0.12em;
    }
  }

  @media (max-width: 480px) {
    .card p {
      font-size: 0.9rem;
      line-height: 1.3;
      letter-spacing: 0.1em;
    }
  }

  .card .know-more-btn {
    background: linear-gradient(135deg, #000000, #374151);
    color: white;
    border: 1px solid #000000;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    transition: all 0.2s ease;
    margin-top: auto;
    flex-shrink: 0;
  }

  /* Mobile button sizing */
  @media (max-width: 768px) {
    .card .know-more-btn {
      padding: 0.4rem 0.8rem;
      font-size: 0.75rem;
    }
  }

  @media (max-width: 480px) {
    .card .know-more-btn {
      padding: 0.35rem 0.7rem;
      font-size: 0.7rem;
    }
  }

  .card .know-more-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    background: linear-gradient(135deg, #1F2937, #000000);
    border-color: #1F2937;
  }

  .card .know-more-btn:active {
    transform: translateY(0);
  }

  .card p, .card h2, .card .card-logo, .card .know-more-btn {
    transition: all 0.3s ease-out;
    opacity: var(--active);
  }

  .nav {
    color: #000000;
    font-size: 4rem;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    z-index: 2;
    cursor: pointer;
    user-select: none;
    background: unset;
    border: unset;
    transition: all 0.2s ease;
    text-shadow: 0 2px 4px rgba(255, 255, 255, 0.8);
  }

  /* Mobile navigation sizing */
  @media (max-width: 768px) {
    .nav {
      font-size: 3rem;
    }
  }

  @media (max-width: 480px) {
    .nav {
      font-size: 2.5rem;
    }
  }

  .nav:hover {
    color: #374151;
    transform: scale(1.1) translateY(-50%);
    text-shadow: 0 2px 8px rgba(255, 255, 255, 1);
  }

  .nav.left {
    left: 0;
    transform: translateX(-100%) translateY(-50%);
  }

  .nav.left:hover {
    transform: translateX(-100%) translateY(-50%) scale(1.1);
    color: #374151;
    text-shadow: 0 2px 8px rgba(255, 255, 255, 1);
  }

  .nav.right {
    right: 0;
    transform: translateX(100%) translateY(-50%);
  }

  .nav.right:hover {
    transform: translateX(100%) translateY(-50%) scale(1.1);
    color: #374151;
    text-shadow: 0 2px 8px rgba(255, 255, 255, 1);
  }
`;

const MAX_VISIBILITY = 3;

// --- Card Component ---
// This is the template for each item in the carousel.
const Card = ({ logo, title, description, link }) => (
  <div className='card'>
    <img src={logo} alt={`${title} logo`} className="card-logo" />
    <h2>{title}</h2>
    <p>{description}</p>
    {link && (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="know-more-btn"
      >
        Know More
      </a>
    )}
  </div>
);

// --- Carousel Component ---
// The main component that manages state and renders the cards.
const PerspectiveCarousel = ({ items }) => {
  const [active, setActive] = useState(Math.floor(items.length / 2)); // Start in the middle
  const count = items.length;

  // Effect to inject styles into the document head
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = carouselStyles;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className='perspective-carousel-container'>
      <div className='carousel'>
        {active > 0 && (
          <button className='nav left' onClick={() => setActive(i => i - 1)}>
            <TiChevronLeftOutline />
          </button>
        )}
        {items.map((item, i) => {
          const activeIndex = active;
          return (
            <div
              key={item.id}
              className='card-container'
              style={{
                '--active': i === activeIndex ? 1 : 0,
                '--offset': (activeIndex - i) / 3,
                '--direction': Math.sign(activeIndex - i),
                '--abs-offset': Math.abs(activeIndex - i) / 3,
                'pointer-events': activeIndex === i ? 'auto' : 'none',
                'opacity': Math.abs(activeIndex - i) >= MAX_VISIBILITY ? '0' : '1',
                'display': Math.abs(activeIndex - i) > MAX_VISIBILITY ? 'none' : 'block',
              }}
            >
              <Card {...item} />
            </div>
          );
        })}
        {active < count - 1 && (
          <button className='nav right' onClick={() => setActive(i => i + 1)}>
            <TiChevronRightOutline />
          </button>
        )}
      </div>
    </div>
  );
};

export default PerspectiveCarousel;