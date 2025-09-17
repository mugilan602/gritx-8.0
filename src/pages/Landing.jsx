import React, { useEffect, useRef } from 'react';
import { gsap } from 'https://esm.sh/gsap';
import { ScrollTrigger } from 'https://esm.sh/gsap/ScrollTrigger';
import Lenis from 'https://esm.sh/@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

export default function Landing() {
    const mainRef = useRef(null);
    const heroSectionRef = useRef(null);
    const aboutSectionRef = useRef(null);
    const eventsSectionRef = useRef(null);
    const placeholderRef = useRef(null);
    const iRef = useRef(null);
    const aboutDestinationRef = useRef(null);
    const eventsDestinationRef = useRef(null);
    const logoRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        function raf(time) {
            lenis.raf(time);
            ScrollTrigger.update();
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        const ctx = gsap.context(() => {
            ScrollTrigger.refresh();

            const placeholder = placeholderRef.current;
            const iChar = iRef.current;
            const aboutDestination = aboutDestinationRef.current;
            const aboutSection = aboutSectionRef.current;
            const eventsDestination = eventsDestinationRef.current;
            const eventsSection = eventsSectionRef.current;

            const mainRect = mainRef.current.getBoundingClientRect();
            const iRect = iChar.getBoundingClientRect();
            const initialTop = iRect.top - mainRect.top;
            const initialLeft = iRect.left - mainRect.left + iRect.width / 2 - 50;

            const aboutDestRect = aboutDestination.getBoundingClientRect();
            const aboutFinalTop = aboutDestRect.top - mainRect.top + aboutDestRect.height / 2 - 50;
            const aboutFinalLeft = aboutDestRect.left - mainRect.left + aboutDestRect.width / 2 - 50;

            const eventsDestRect = eventsDestination.getBoundingClientRect();
            const eventsFinalTop = eventsDestRect.top - mainRect.top + eventsDestRect.height / 2 - 50;
            const eventsFinalLeft = eventsDestRect.left - mainRect.left + eventsDestRect.width / 2 - 50;

            gsap.set(placeholder, {
                top: initialTop,
                left: initialLeft,
                scale: 1,
            });

            const masterTimeline = gsap.timeline({
                paused: true,
                defaults: { ease: 'none' },
            });

            masterTimeline.to(placeholder, {
                top: aboutFinalTop,
                left: aboutFinalLeft,
                scale: 2.5,
            });

            masterTimeline.to(placeholder, {
                top: eventsFinalTop,
                left: eventsFinalLeft,
                scale: 1.5,
            });

            ScrollTrigger.create({
                trigger: aboutSection,
                start: 'top bottom',
                end: 'center center',
                scrub: true,
                onUpdate: (self) => {
                    masterTimeline.progress(self.progress * 0.5);
                },
            });

            ScrollTrigger.create({
                trigger: eventsSection,
                start: 'top bottom',
                end: 'center center',
                scrub: true,
                onUpdate: (self) => {
                    masterTimeline.progress(0.5 + self.progress * 0.5);
                },
            });
        }, mainRef);

        return () => {
            ctx.revert();
            lenis.destroy();
        };
    }, []);

    return (
        <div ref={mainRef} className="bg-gray-900 text-white font-sans overflow-x-hidden relative">

            <div ref={placeholderRef} className="absolute w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] bg-gray-500 z-10 rounded-lg shadow-2xl"></div>

            {/* Hero Section */}
            <section ref={heroSectionRef} className="min-h-screen w-full flex flex-col items-center justify-center px-4">
                <div ref={logoRef} className="gritx-title text-[20vw] md:text-[15vw] font-black text-gray-200 flex items-center justify-center z-0 transform origin-center">
                    <span>G</span>
                    <span>R</span>
                    <span ref={iRef} className="relative">I</span>
                    <span>T</span>
                    <span>X</span>
                </div>
            </section>

            {/* About Section */}
            <section ref={aboutSectionRef} className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center py-16 px-4">
                <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">About GRITX</h2>
                    <p className="text-gray-300 text-base md:text-lg">
                        GRITX represents the pinnacle of design and engineering. Our philosophy is rooted in precision, strength, and a forward-thinking approach to solve complex challenges. We build solutions that are not only robust but also elegant and intuitive.
                    </p>
                </div>
                <div ref={aboutDestinationRef} className="w-full md:w-1/2 flex items-center justify-center min-h-[200px] sm:min-h-[300px]">
                </div>
            </section>

            {/* Events Section */}
            <section ref={eventsSectionRef} className="min-h-screen w-full flex flex-col items-center justify-center py-16 px-4 bg-gray-900">
                <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
                    <div className="w-full md:w-5/12 p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700">
                        <h3 className="text-2xl font-bold mb-4 text-cyan-300">Tech Events</h3>
                        <p className="text-gray-300 text-base">
                            Join our hackathons, workshops, and tech talks. Dive deep into the latest technologies and collaborate with brilliant minds from around the world.
                        </p>
                    </div>

                    <div ref={eventsDestinationRef} className="w-full md:w-2/12 h-[100px] flex-shrink-0"></div>

                    <div className="w-full md:w-5/12 p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700">
                        <h3 className="text-2xl font-bold mb-4 text-fuchsia-300">Community Events</h3>
                        <p className="text-gray-300 text-base">
                            Engage in community-building activities, creative challenges, and networking sessions that foster growth and connection beyond the code.
                        </p>
                    </div>
                </div>
            </section>

            {/* Final Section */}
            <section className="min-h-screen w-full flex items-center justify-center text-center bg-gray-800 px-4">
                <h2 className="text-3xl md:text-4xl font-bold">The Journey Continues</h2>
            </section>
        </div>
    );
}
