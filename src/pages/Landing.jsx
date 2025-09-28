import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'https://esm.sh/gsap';
import { ScrollTrigger } from 'https://esm.sh/gsap/ScrollTrigger';
import Lenis from 'https://esm.sh/@studio-freight/lenis';
import { motion } from 'framer-motion';
import ProgramOfficers from '../components/ProgramOfficers';
import MainLeads from '../components/MainLeads';
// import { useSectionContext } from '../context/SectionContext.jsx'; // Context not used in this snippet

gsap.registerPlugin(ScrollTrigger);

function generateInitialLogos() {
    return Array.from({ length: 8 }, (_, i) => ({
        id: i,
        label: `Logo ${i + 1}`,
    }));
}

export default function Landing({ heroSectionRef, aboutSectionRef }) {
    const mainRef = useRef(null);
    const eventsSectionRef = useRef(null);
    const placeholderRef = useRef(null);
    const iRef = useRef(null);
    const aboutDestinationRef = useRef(null);
    const eventsDestinationRef = useRef(null);
    const logoRef = useRef(null);
    const circleRef = useRef(null);

    const [radius, setRadius] = useState(140);
    const [logos, setLogos] = useState(generateInitialLogos());
    const [timeLeft, setTimeLeft] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0
    });

    // ✅ FIX: Set a CSS variable for the viewport height to handle mobile browser UI.
    useEffect(() => {
        const setVh = () => {
            document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
        };
        setVh();
        window.addEventListener('resize', setVh);
        return () => window.removeEventListener('resize', setVh);
    }, []);

    // Update radius for circular logos based on screen size
    useEffect(() => {
        const updateRadius = () => {
            setRadius(window.innerWidth < 768 ? 120 : 140);
        };
        updateRadius();
        window.addEventListener('resize', updateRadius);
        return () => window.removeEventListener('resize', updateRadius);
    }, []);

    const getPosition = (index, count, r) => {
        const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        return { x, y };
    };

    // Countdown timer effect
    useEffect(() => {
        const targetDate = new Date('October 16, 2025 09:00:00').getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Main animation and smooth scroll effect (optimized for mobile performance)
    useEffect(() => {
        const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isMobile = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 767px)').matches;
        const lenis = new Lenis({
            duration: prefersReducedMotion ? 0.6 : (isMobile ? 0.9 : 1.15),
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: true,
        });

        // Only trigger ScrollTrigger recalculation when Lenis reports a scroll
        const onLenisScroll = () => ScrollTrigger.update();
        lenis.on('scroll', onLenisScroll);

        let rafId;
        const raf = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        // Debounced refresh for orientation or viewport height changes (mobile address bar)
        let refreshTimer;
        const queueRefresh = () => {
            if (refreshTimer) clearTimeout(refreshTimer);
            refreshTimer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 250);
        };
        window.addEventListener('resize', queueRefresh, { passive: true });
        window.addEventListener('orientationchange', queueRefresh, { passive: true });

        const ctx = gsap.context(() => {
            const placeholder = placeholderRef.current;
            const aboutSection = aboutSectionRef.current;
            const eventsSection = eventsSectionRef.current;
            const aboutDestination = aboutDestinationRef.current;
            const eventsDestination = eventsDestinationRef.current;
            const mainContainer = mainRef.current;

            // This function calculates positions relative to the main container
            const getRelativePos = (target) => {
                const targetBounds = target.getBoundingClientRect();
                const mainBounds = mainContainer.getBoundingClientRect();
                const placeholderBounds = placeholder.getBoundingClientRect();

                return {
                    x: targetBounds.left - mainBounds.left + (targetBounds.width / 2) - (placeholderBounds.width / 2),
                    y: targetBounds.top - mainBounds.top + (targetBounds.height / 2) - (placeholderBounds.height / 2),
                };
            };

            const initialPos = getRelativePos(circleRef.current);
            const aboutFinalPos = getRelativePos(aboutDestination);
            const eventsFinalPos = getRelativePos(eventsDestination);

            // ✅ FIX: Animate `x` and `y` (transform) instead of `top` and `left` for performance.
            gsap.set(placeholder, {
                x: initialPos.x,
                y: initialPos.y,
                scale: 1,
                transformOrigin: '50% 50%',
            });

            const masterTimeline = gsap.timeline({ paused: true, defaults: { ease: 'none' } });

            masterTimeline
                .to(placeholder, {
                    x: aboutFinalPos.x,
                    y: aboutFinalPos.y,
                    scale: 2.5,
                })
                .to(placeholder, {
                    x: eventsFinalPos.x,
                    y: eventsFinalPos.y,
                    scale: 1.5,
                });

            // Single combined trigger spanning both sections for fewer updates
            ScrollTrigger.create({
                trigger: aboutSection,
                start: 'top bottom',
                endTrigger: eventsSection,
                end: 'center center',
                scrub: true,
                onUpdate: (self) => {
                    masterTimeline.progress(self.progress);
                },
            });

            // Initial refresh
            ScrollTrigger.refresh();

        }, mainRef);

        return () => {
            ctx.revert();
            lenis.off('scroll', onLenisScroll);
            lenis.destroy();
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', queueRefresh);
            window.removeEventListener('orientationchange', queueRefresh);
        };
    }, []);

    // Randomly reorder logos
    useEffect(() => {
        const interval = setInterval(() => {
            setLogos((currentLogos) => [...currentLogos].sort(() => Math.random() - 0.5));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div ref={mainRef} className="text-white font-sans overflow-x-hidden relative">
            {/* ✅ FIX: Positioned with transform, not top/left */}
            <div ref={placeholderRef} style={{ willChange: 'transform' }} className="absolute top-0 left-0 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] bg-gray-500 z-10 rounded-lg shadow-2xl"></div>

            {/* Hero Section */}
            {/* ✅ FIX: Added the 'full-vh' class for reliable height on mobile */}
            <section ref={heroSectionRef} className="w-full flex flex-col items-center justify-center px-4 full-vh">
                <div className="flex flex-col md:flex-row w-full items-center justify-center md:space-y-0 md:space-x-16">
                    {/* Left Column: GRITX Title */}
                    <div className="flex flex-col items-center">
                        <div className="text-center text-xs md:text-sm uppercase tracking-widest text-gray-300">
                            <div>SRI SAIRAM ENGINEERING COLLEGE</div>
                            <div>NATIONAL SERVICE SCHEME</div>
                            <div className="mt-2 font-medium text-gray-100">PRESENTS</div>
                        </div>

                        <div ref={logoRef} className="gritx-title text-[20vw] md:text-[12vw] font-black text-gray-200 flex items-center justify-center">
                            <span>G</span><span>R</span><span ref={iRef} className="relative">I</span><span>T</span><span>X</span><span>8</span><span>.</span><span>0</span>
                        </div>
                    </div>

                    {/* Right Column: Circular animated logos */}
                    <motion.div
                        className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center sm:my-0 my-16"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
                    >
                        <motion.div
                            ref={circleRef}
                            className="absolute inset-0 flex items-center justify-center"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                        >
                            <div className="w-6 h-6 bg-gray-600 rounded-full z-0" />
                        </motion.div>

                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {logos.map((logo, idx) => {
                                const pos = getPosition(idx, logos.length, radius);
                                return (
                                    <motion.div
                                        key={logo.id}
                                        className="pointer-events-auto absolute w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center text-black font-bold"
                                        layout
                                        initial={{ opacity: 0.8, scale: 0.95 }}
                                        animate={{ x: pos.x, y: pos.y, opacity: 1, scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                                    >
                                        {logo.label}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                {/* Countdown Timer */}
                <div className="text-center mt-8">
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
                        <div className="flex flex-col items-center">
                            <div className="text-2xl md:text-5xl font-bold text-cyan-400">{timeLeft.days}</div>
                            <div className="text-sm uppercase tracking-wider text-gray-400">Days</div>
                        </div>
                        <div className="text-4xl md:text-5xl font-bold text-gray-600 self-start">:</div>
                        <div className="flex flex-col items-center">
                            <div className="text-2xl md:text-5xl font-bold text-cyan-400">{timeLeft.hours}</div>
                            <div className="text-sm uppercase tracking-wider text-gray-400">Hours</div>
                        </div>
                        <div className="text-4xl md:text-5xl font-bold text-gray-600 self-start">:</div>
                        <div className="flex flex-col items-center">
                            <div className="text-2xl md:text-5xl font-bold text-cyan-400">{timeLeft.minutes}</div>
                            <div className="text-sm uppercase tracking-wider text-gray-400">Minutes</div>
                        </div>
                        <div className="sm:block hidden text-4xl md:text-5xl font-bold text-gray-600 self-start">:</div>
                        <div className="hidden sm:flex flex-col items-center">
                            <div className="text-4xl md:text-5xl font-bold text-cyan-400">{timeLeft.seconds}</div>
                            <div className="text-sm uppercase tracking-wider text-gray-400">Seconds</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section ref={aboutSectionRef} className="w-full flex flex-col space-y-20 sm:space-y-0 md:flex-row items-center justify-center py-16 px-4 full-vh">
                <div ref={aboutDestinationRef} className="w-full md:w-1/2 flex items-center justify-center min-h-[200px] sm:min-h-[300px]"></div>
                <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">About GRITX</h2>
                    <p className="text-gray-300 text-base md:text-lg">
                        GRITX represents the pinnacle of design and engineering. Our philosophy is rooted in precision, strength, and a forward-thinking approach to solve complex challenges. We build solutions that are not only robust but also elegant and intuitive.
                    </p>
                </div>
            </section>

            {/* Events Section */}
            <section ref={eventsSectionRef} className="w-full flex flex-col items-center justify-center py-16 px-4 full-vh">
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

            <section>
                <ProgramOfficers />
            </section>
            <section>
                <MainLeads />
            </section>
        </div>
    );
}