import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { FaTrophy, FaUsers } from 'react-icons/fa';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export default function AnimatedEventPage({ eventData }) {
    const containerRef = useRef();
    const sectionsWrapperRef = useRef();

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

            // Set initial state for cards: all but the first are hidden below
            if (roundCards.length > 0) {
                gsap.set(roundCards.slice(1), { yPercent: 100 });
            }

            // Calculate the total scrollable distance
            // Horizontal part + vertical part for the card animations
            const totalHorizontalScroll = (sections.length - 1) * window.innerWidth;
            const totalVerticalScroll = (roundCards.length - 1) * window.innerHeight;

            // --- CREATE A SINGLE MASTER TIMELINE ---
            const masterTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: () => `+=${totalHorizontalScroll + totalVerticalScroll}`,
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

        }, containerRef);

        return () => {
            ctx.revert();
            lenis.destroy();
        };
    }, [eventData]);

    return (
        <div ref={containerRef} className="text-white overflow-hidden">
            <div
                ref={sectionsWrapperRef}
                className="flex h-screen w-max"
                style={{ willChange: 'transform' }}
            >
                {/* Section 1: Header */}
                <div className="section flex flex-col items-center justify-center w-screen h-screen p-8">
                    <img
                        src={eventData.logoUrl}
                        alt={`${eventData.name} Logo`}
                        className="w-24 h-24 rounded-full bg-gray-800 p-2 shadow-md border border-gray-700 mb-6"
                    />
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white">
                        {eventData.name}
                    </h1>
                    <p className="mt-4 text-lg text-gray-300 leading-relaxed text-center max-w-xl">
                        {eventData.description}
                    </p>
                </div>

                {/* Section 2: Event Rounds */}
                <div className="section flex flex-col justify-center w-screen h-screen p-8 overflow-hidden">
                    <div className="relative w-full h-full">
                        {eventData.rounds.map((round) => (
                            <div
                                key={round.id}
                                className="round-card absolute inset-0 w-full h-full flex items-center justify-center p-8"
                            >
                                <div className="bg-[#111] border border-gray-800 p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
                                    <h3 className="text-3xl font-bold text-white mb-4 text-center">{round.title}</h3>
                                    <p className="text-gray-300 leading-relaxed text-center">{round.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 3: Prizes & Details */}
                <div className="section flex flex-col justify-center w-screen h-screen p-8">
                    <h2 className="text-4xl font-bold mb-8 text-center">Prizes & Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        <div className="bg-gray-900 p-4 rounded-lg text-center border border-gray-700">
                            <FaTrophy className="mx-auto text-white" size={32} />
                            <h3 className="font-bold text-xl mt-2">1st Prize</h3>
                            <p className="text-gray-400">{eventData.details.prizes.first}</p>
                        </div>
                        <div className="bg-gray-900 p-4 rounded-lg text-center border border-gray-700">
                            <FaTrophy className="mx-auto text-gray-400" size={32} />
                            <h3 className="font-bold text-xl mt-2">2nd Prize</h3>
                            <p className="text-gray-400">{eventData.details.prizes.second}</p>
                        </div>
                        <div className="bg-gray-900 p-4 rounded-lg text-center border border-gray-700">
                            <FaTrophy className="mx-auto text-gray-600" size={32} />
                            <h3 className="font-bold text-xl mt-2">3rd Prize</h3>
                            <p className="text-gray-400">{eventData.details.prizes.third}</p>
                        </div>
                        <div className="bg-gray-900 p-4 rounded-lg text-center border border-gray-700">
                            <FaUsers className="mx-auto text-white" size={32} />
                            <h3 className="font-bold text-xl mt-2">Team Size</h3>
                            <p className="text-gray-400">{eventData.details.teamSize}</p>
                        </div>
                    </div>
                </div>

                {/* Section 4: Coordinators */}
                <div className="section flex flex-col justify-center w-screen h-screen p-8">
                    <h2 className="text-4xl font-bold mb-8 text-center">Meet the Coordinators</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {eventData.coordinators.map((coordinator) => (
                            <div
                                key={coordinator.id}
                                className="bg-gray-900 p-4 rounded-lg text-center border border-gray-800"
                            >
                                <img
                                    src={coordinator.imageUrl}
                                    alt={coordinator.name}
                                    className="w-24 h-24 mx-auto rounded-full mb-4 border-2 border-gray-600"
                                />
                                <h3 className="text-xl font-bold">{coordinator.name}</h3>
                                <p className="text-gray-400">{coordinator.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}