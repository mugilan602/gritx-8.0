import React, { useLayoutEffect, useRef } from 'react';
import { useWindowSize } from '../hooks/useWindowSize';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { FaTrophy, FaUsers } from 'react-icons/fa';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export default function AnimatedEventPage({ eventData }) {
    const containerRef = useRef();
    const sectionsWrapperRef = useRef();
    const floatingVideoRefs = useRef([]);
    const [width] = useWindowSize();
    const isMobile = width < 768;
    const numberOfVideos = isMobile ? 3 : 4;

    useLayoutEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray('.section');
            const roundCards = gsap.utils.toArray('.round-card');
            const coordinatorCards = gsap.utils.toArray('.coordinator-card');

            // Set initial state for cards: all but the first are hidden below
            if (roundCards.length > 0) {
                gsap.set(roundCards.slice(1), { yPercent: 100 });
            }

            // Set initial state for coordinator cards: all but the first are hidden below
            if (coordinatorCards.length > 0) {
                gsap.set(coordinatorCards.slice(1), { yPercent: 100 });
            }

            // Initialize multiple floating video animations
            floatingVideoRefs.current.forEach((videoRef, index) => {
                if (videoRef) {
                    // Set different initial positions for each video
                    const initialPositions = [
                        { x: window.innerWidth * 0.2, y: window.innerHeight * 0.3 },
                        { x: window.innerWidth * 0.7, y: window.innerHeight * 0.2 },
                        { x: window.innerWidth * 0.8, y: window.innerHeight * 0.7 },
                        { x: window.innerWidth * 0.3, y: window.innerHeight * 0.8 }
                    ];

                    const initialPos = initialPositions[index] || { x: window.innerWidth / 2, y: window.innerHeight / 2 };

                    // Set initial position and properties with variations
                    gsap.set(videoRef, {
                        x: initialPos.x - 32,
                        y: initialPos.y - 32,
                        rotation: (Math.random() - 0.5) * 20, // Random initial rotation
                        scale: 0.9 + Math.random() * 0.3, // Slight scale variation
                        opacity: 0.5 + Math.random() * 0.3 // Varying opacity between 0.5-0.8
                    });

                    // Create floating animation function for each video
                    const animateFloating = () => {
                        const randomX = Math.random() * (window.innerWidth - 80);
                        const randomY = Math.random() * (window.innerHeight - 80);
                        const randomRotation = (Math.random() - 0.5) * 30; // -15° to 15°
                        const randomScale = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
                        const duration = 4 + Math.random() * 6 + index; // Varying durations to avoid sync

                        gsap.to(videoRef, {
                            x: randomX,
                            y: randomY,
                            rotation: randomRotation,
                            scale: randomScale,
                            duration: duration,
                            ease: "power2.inOut",
                            delay: index * 0.5, // Stagger start times
                            onComplete: animateFloating
                        });
                    };

                    // Start each animation with a slight delay
                    gsap.delayedCall(index * 0.8, animateFloating);
                }
            });

            // Calculate the total scrollable distance
            // Horizontal part + vertical part for the card animations
            const totalHorizontalScroll = (sections.length - 1) * window.innerWidth;
            const totalVerticalScroll = (roundCards.length - 1) * window.innerHeight;
            const totalCoordinatorScroll = (coordinatorCards.length - 1) * window.innerHeight;

            // --- CREATE A SINGLE MASTER TIMELINE ---
            const masterTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: () => `+=${totalHorizontalScroll + totalVerticalScroll + totalCoordinatorScroll}`,
                    scrub: true,
                    pin: true,
                }
            });

            // --- ADD ANIMATIONS SEQUENTIALLY TO THE MASTER TIMELINE ---

            // 1. Animate from Section 1 (Header) to Section 2 (Rounds)
            masterTimeline.to(sectionsWrapperRef.current, {
                x: () => `-${window.innerWidth * 1}`,
                ease: 'none',
            });

            // 2. Add the pinned card stacking animation
            if (roundCards.length > 1) {
                // Create a separate timeline for just the cards (without a trigger)
                const roundsTimeline = gsap.timeline();
                roundCards.slice(1).forEach(card => {
                    roundsTimeline.to(card, { yPercent: 0, ease: 'none' });
                });
                // Add the card animation to the master timeline
                masterTimeline.add(roundsTimeline);
            }

            // 3. Animate from Section 2 (Rounds) to Section 3 (Prizes)
            masterTimeline.to(sectionsWrapperRef.current, {
                x: () => `-${window.innerWidth * 2}`,
                ease: 'none',
            });

            // 4. Animate from Section 3 (Prizes) to Section 4 (Coordinators)
            masterTimeline.to(sectionsWrapperRef.current, {
                x: () => `-${window.innerWidth * 3}`,
                ease: 'none',
            });

            // 5. Add the coordinator card stacking animation
            if (coordinatorCards.length > 1) {
                // Create a separate timeline for just the coordinator cards (without a trigger)
                const coordinatorsTimeline = gsap.timeline();
                coordinatorCards.slice(1).forEach(card => {
                    coordinatorsTimeline.to(card, { yPercent: 0, ease: 'none' });
                });
                // Add the coordinator animation to the master timeline
                masterTimeline.add(coordinatorsTimeline);
            }

        }, containerRef);

        return () => {
            ctx.revert();
            lenis.destroy();
        };
    }, [eventData]);

    return (
        <div ref={containerRef} className="text-white overflow-hidden">
            {/* Multiple Floating Video Animations */}
            {Array.from({ length: numberOfVideos }).map((_, index) => (
                <video
                    key={index}
                    ref={(el) => (floatingVideoRefs.current[index] = el)}
                    className="fixed pointer-events-none"
                    style={{
                        width: isMobile ? '40px' : '56px',
                        height: isMobile ? '40px' : '56px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        mixBlendMode: 'screen', // Alternate blend modes
                        zIndex: 50 + index, // Different z-indexes
                        filter: `hue-rotate(${index * 30}deg)` // Different color tints
                    }}
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/animation.mp4" type="video/mp4" />
                </video>
            ))}

            <div
                ref={sectionsWrapperRef}
                className="flex h-screen w-max"
                style={{ willChange: 'transform' }}
            >
                {/* Section 1: Header */}
                <div className="section flex flex-col items-center justify-center w-screen h-screen p-4 sm:p-6 md:p-8">
                    <img
                        src={eventData.logoUrl}
                        alt={`${eventData.name} Logo`}
                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gray-800 p-2 shadow-md border border-gray-700 mb-4 sm:mb-6"
                    />
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white text-center px-2">
                        {eventData.name}
                    </h1>
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed text-center max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto px-4">
                        {eventData.description}
                    </p>
                </div>

                {/* Section 2: Event Rounds */}
                <div className="section flex flex-col justify-center items-center w-screen h-screen p-4 sm:p-4 overflow-hidden">
                    <div className="relative w-full h-full mx-auto">
                        {eventData.rounds.map((round, index) => (
                            <div
                                key={round.id}
                                className="round-card absolute inset-0 w-full h-full flex items-center justify-center p-4 sm:p-4 overflow-auto"
                                style={{ zIndex: index + 1 }}
                            >
                                <div className="bg-[#111] border border-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto" style={{ maxHeight: 'calc(100vh - 4rem)', overflowY: 'auto' }}>
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 text-center">{round.title}</h3>
                                    <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed text-center">{round.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 3: Prizes & Details */}
                <div className="section flex flex-col justify-center w-screen h-screen p-4 sm:p-6 md:p-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center">Prizes & Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto px-4">
                        <div className="bg-gray-900 p-3 sm:p-4 rounded-lg text-center border border-gray-700">
                            <FaTrophy className="mx-auto text-white" size={isMobile ? 24 : 32} />
                            <h3 className="font-bold text-base sm:text-lg md:text-xl mt-2">1st Prize</h3>
                            <p className="text-gray-400 text-xs sm:text-sm md:text-base">{eventData.details.prizes.first}</p>
                        </div>
                        <div className="bg-gray-900 p-3 sm:p-4 rounded-lg text-center border border-gray-700">
                            <FaTrophy className="mx-auto text-gray-400" size={isMobile ? 24 : 32} />
                            <h3 className="font-bold text-base sm:text-lg md:text-xl mt-2">2nd Prize</h3>
                            <p className="text-gray-400 text-xs sm:text-sm md:text-base">{eventData.details.prizes.second}</p>
                        </div>
                        <div className="bg-gray-900 p-3 sm:p-4 rounded-lg text-center border border-gray-700">
                            <FaTrophy className="mx-auto text-gray-600" size={isMobile ? 24 : 32} />
                            <h3 className="font-bold text-base sm:text-lg md:text-xl mt-2">3rd Prize</h3>
                            <p className="text-gray-400 text-xs sm:text-sm md:text-base">{eventData.details.prizes.third}</p>
                        </div>
                        <div className="bg-gray-900 p-3 sm:p-4 rounded-lg text-center border border-gray-700">
                            <FaUsers className="mx-auto text-white" size={isMobile ? 24 : 32} />
                            <h3 className="font-bold text-base sm:text-lg md:text-xl mt-2">Team Size</h3>
                            <p className="text-gray-400 text-xs sm:text-sm md:text-base">{eventData.details.teamSize}</p>
                        </div>
                    </div>
                </div>

                {/* Section 4: Coordinators */}
                <div className="section flex flex-col justify-center w-screen h-screen p-4 sm:p-6 md:p-8 overflow-hidden">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-28 sm:my-8 text-center">Meet the Coordinators</h2>
                    <div className="relative bottom-10 sm:bottom-0 w-full h-full">
                        {eventData.coordinators.map((coordinator, index) => (
                            <div
                                key={coordinator.id}
                                className="coordinator-card absolute inset-0 w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-8"
                                style={{ zIndex: index + 1 }}
                            >
                                <div className="bg-gray-900 p-4 sm:p-6 md:p-8 rounded-lg text-center border border-gray-800 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto" style={{ maxHeight: 'calc(100vh - 4rem)', overflowY: 'auto' }}>
                                    <img
                                        src={coordinator.imageUrl}
                                        alt={coordinator.name}
                                        className="w-40 h-40 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto rounded-full mb-4 sm:mb-6 border-2 sm:border-4 border-gray-600 shadow-lg"
                                    />
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">{coordinator.name}</h3>
                                    <p className="text-gray-400 text-sm sm:text-base md:text-lg">{coordinator.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}