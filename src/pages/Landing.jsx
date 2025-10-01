import React, { useEffect, useRef, useState } from 'react';
import placeholderImg from '../assets/placeholder.svg';
import Lenis from 'https://esm.sh/@studio-freight/lenis';
import { motion } from 'framer-motion';
import ProgramOfficers from '../components/ProgramOfficers';
import MainLeads from '../components/MainLeads';
import PerspectiveCarousel from '../components/Carousel';
import BentoGrid from '../components/BentoGrid';

// Events data for carousel
const eventsData = [
    {
        id: 1,
        logo: "/logo1.png",
        title: "PapertriX",
        description: "ProjectriX is a dynamic platform where innovation meets execution. Designed to showcase groundbreaking student projects and prototypes, it provides a stage for young minds to present ideas that bridge creativity, technology, and real-world applications.",
        link: "/papertrix",
    },
    {
        id: 2,
        logo: "/logo2.png",
        title: "Code2Cosmos",
        description: "A coding competition that takes you from basic algorithms to cosmic-scale problems. Challenge your programming skills and explore the universe of code.",
        link: "/code2cosmos",
    },
    {
        id: 3,
        logo: "/logo3.png",
        title: "Roll and Rule",
        description: "🎲 Roll and Rule 👑 – A board game challenge like never before! Every dice roll brings puzzles 🧩, fun tasks 🎨, and surprises 🔮. Think smart 🧐, team up 🤝, and rule the board 🏆!",
        link: "/roll-and-rule",
    },
    {
        id: 4,
        logo: "/logo4.png",
        title: "Script2Screen",
        description: "🎬 Script2Screen – A creative fest celebrating the art of storytelling across TV shows, advertisements, web series, and books! 📚",
        link: "/script2screen",
    },
    {
        id: 5,
        logo: "/logo5.png",
        title: "HuntXcape",
        description: "HuntXcape – an ultimate offline adventure with thrilling puzzles, riddles, and challenges where teams hunt, solve, and escape for nonstop fun! 🚀🔍",
        link: "/huntxcape",
    },
    {
        id: 6,
        logo: "/logo6.png",
        title: "Jockey Junction",
        description: "🎙 RJ Fiesta – Mic, Magic & Madness! Think you've got the voice, vibes, and versatility of an RJ? 🔥 Step into the spotlight and unleash your inner speaking skills!",
        link: "/jockey-junction",
    },
    {
        id: 7,
        logo: "/logo7.png",
        title: "Sportsera",
        description: "SPORTSERA 🎉 is a dynamic team-based sports competition, where each team has two members of the same gender. It's a perfect mix of knowledge, strength, memory, strategy, and adventure!",
        link: "/sportsera",
    },
    {
        id: 8,
        logo: "/logo8.png",
        title: "E-football",
        description: "Join our tournament, get paired with a random teammate, and compete in a knockout challenge. Win to move on; lose and you're out. It's an unpredictable, fun way to test your skills and make a new friend.",
        link: "/e-football",
    },
    {
        id: 9,
        logo: "/logo9.png",
        title: "Cinimax",
        description: "Get ready to dive into the world of cinema with CiniMax – a fun-filled event packed with entertainment, excitement, and nostalgia! From iconic movie scenes to evergreen songs.",
        link: "/cinimax",
    },
    {
        id: 10,
        logo: "/logo10.png",
        title: "Campus Ambassador",
        description: "Become the driving force of GritX 8.0 as a Campus Ambassador! 🌟 Lead campus promotions 📣, spark excitement 🔥, and drive registrations 🚀 while showcasing your leadership skills.",
        link: "/campus-ambassador",
    },
    {
        id: 11,
        logo: "/logo11.png",
        title: "Frozen Frames",
        description: "Capture the perfect moment with photography and videography challenges. Showcase your creative vision and technical skills in this visual storytelling competition.",
        link: "/frozen-frames",
    },
];

function generateInitialLogos() {
    // All 11 available logos
    const allLogos = Array.from({ length: 11 }, (_, i) => ({
        id: i,
        logo: `/logo${i + 1}.png`,
        label: `Logo ${i + 1}`,
    }));

    // Randomly select 8 logos out of 11
    const shuffled = allLogos.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 8);
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
    // Mobile hero animation wrapper
    const heroAnimRef = useRef(null);

    const [radius, setRadius] = useState(140);
    const [logos, setLogos] = useState(generateInitialLogos());
    const [timeLeft, setTimeLeft] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0
    });

    // ✅ FIX: Set a CSS variable for the viewport height to handle mobile browser UI.
    useEffect(() => {
        const setVh = () => {
            // Use visualViewport if available (ignores browser UI), fallback to innerHeight
            const height = window.visualViewport ? window.visualViewport.height : window.innerHeight;
            document.documentElement.style.setProperty('--vh', `${height * 0.01}px`);
        };

        setVh();

        // Listen to visualViewport changes if supported
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', setVh);
            window.visualViewport.addEventListener('scroll', setVh);
        } else {
            window.addEventListener('resize', setVh);
        }

        return () => {
            if (window.visualViewport) {
                window.visualViewport.removeEventListener('resize', setVh);
                window.visualViewport.removeEventListener('scroll', setVh);
            } else {
                window.removeEventListener('resize', setVh);
            }
        };
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

    // Lenis smooth scroll with placeholder animation for all screens
    useEffect(() => {
        const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const lenis = new Lenis({
            duration: prefersReducedMotion ? 0.6 : 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: true,
        });

        // Make Lenis instance globally available for ScrollToTop component
        window.lenis = lenis;

        const placeholder = placeholderRef.current;
        const heroEl = heroSectionRef?.current;
        const aboutEl = aboutSectionRef?.current;
        const eventsEl = eventsSectionRef?.current;
        const aboutDestination = aboutDestinationRef.current;
        const eventsDestination = eventsDestinationRef.current;
        const mainContainer = mainRef.current;
        const circleEl = circleRef.current;

        // Helper to detect actual navbar/header height dynamically
        const getNavbarHeight = () => {
            // Try to detect fixed navbar elements
            const navbar = document.querySelector('nav, .navbar, .header, [class*="nav"]');
            if (navbar && window.getComputedStyle(navbar).position === 'fixed') {
                return navbar.offsetHeight;
            }
            // Fallback to reasonable default (increased for larger logo)
            return 100;
        };

        // Helper to get accurate viewport position for fixed positioning with perfect center alignment
        const getViewportPos = (target) => {
            if (!target) return { x: 0, y: 0 };
            const targetBounds = target.getBoundingClientRect();

            // For circleRef (hero section), ensure we get the true center of the circular logo area
            if (target === circleRef) {
                // Get the parent container (the motion.div with w-64 h-64 md:w-96 md:h-96)
                const parentContainer = target.parentElement;
                if (parentContainer) {
                    const parentBounds = parentContainer.getBoundingClientRect();
                    return {
                        x: parentBounds.left + (parentBounds.width / 2),
                        y: parentBounds.top + (parentBounds.height / 2),
                    };
                }
            }

            // Calculate exact center position of target element relative to viewport
            // Ensure we get the true geometric center of the destination element
            const centerX = targetBounds.left + (targetBounds.width / 2);
            const centerY = targetBounds.top + (targetBounds.height / 2);

            // For debugging: log the center positions to ensure accuracy
            // console.log(`Target center: ${centerX}, ${centerY}, bounds:`, targetBounds);

            // Return the exact center coordinates without premature constraints
            // Constraints will be applied later in constrainToViewport()
            return {
                x: centerX,
                y: centerY,
            };
        };        // Helper to constrain position within viewport bounds with scale awareness and safe margins
        const constrainToViewport = (x, y, baseSize, currentScale) => {
            // Calculate actual scaled dimensions
            const scaledSize = baseSize * currentScale;
            const halfScaledSize = scaledSize / 2;

            // Dynamic safe margins based on viewport and navbar
            const navbarHeight = getNavbarHeight();
            const topSafeMargin = navbarHeight + 25; // Navbar + minimal safety for better centering
            const sideSafeMargin = 25; // Reduced side margins for better centering
            const bottomSafeMargin = 25; // Reduced bottom margin for better centering

            // Calculate safe boundaries for the logo center point using visual viewport
            const viewportWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
            const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;

            const minX = halfScaledSize + sideSafeMargin;
            const maxX = viewportWidth - halfScaledSize - sideSafeMargin;
            const minY = halfScaledSize + topSafeMargin; // Critical: prevent top clipping
            const maxY = viewportHeight - halfScaledSize - bottomSafeMargin;

            // Prioritize perfect centering - only constrain if absolutely necessary to prevent clipping
            let constrainedX = x;
            let constrainedY = y;

            // Only apply X constraint if the logo would be clipped
            if (x - halfScaledSize < sideSafeMargin) {
                constrainedX = minX;
            } else if (x + halfScaledSize > viewportWidth - sideSafeMargin) {
                constrainedX = maxX;
            }

            // Only apply Y constraint if the logo would be clipped
            if (y - halfScaledSize < topSafeMargin) {
                constrainedY = minY;
            } else if (y + halfScaledSize > viewportHeight - bottomSafeMargin) {
                constrainedY = maxY;
            }

            return {
                x: constrainedX,
                y: constrainedY
            };
        };

        // Initialize placeholder positioning system with perfect center alignment
        const initializePlaceholder = () => {
            if (!placeholder || !circleEl) return;

            const placeholderSize = window.innerWidth < 640 ? 120 : 150;
            const isMobile = window.innerWidth < 768; // md breakpoint
            const initialPos = getViewportPos(circleEl);

            // Ensure we have a valid initial position
            if (!initialPos) return;

            const constrainedPos = constrainToViewport(initialPos.x, initialPos.y, placeholderSize, 1);

            // Convert center-based coordinates to top-left for CSS transform
            const halfSize = placeholderSize / 2;
            const translateX = constrainedPos.x - halfSize;
            const translateY = constrainedPos.y - halfSize;

            // Set initial position with enhanced styling and perfect centering
            placeholder.style.position = 'fixed';
            placeholder.style.transform = `translate(${translateX}px, ${translateY}px) scale(1)`;
            placeholder.style.transformOrigin = '50% 50%';
            placeholder.style.willChange = 'transform, opacity';
            placeholder.style.opacity = isMobile ? '0.4' : '1'; // Lower opacity on mobile
            placeholder.style.visibility = 'visible';
            placeholder.style.zIndex = isMobile ? '10' : '50'; // Lower z-index on mobile to go behind text
            placeholder.style.pointerEvents = 'none';

            // Ensure no transition conflicts during initialization
            placeholder.style.transition = 'none';
            setTimeout(() => {
                placeholder.style.transition = 'transform 0.1s ease-out, opacity 0.3s ease-out';
            }, 100);
        };

        let ticking = false;
        const updateAnimation = () => {
            ticking = false;

            if (!placeholder || !heroEl || !aboutEl || !eventsEl || !circleEl || !aboutDestination || !eventsDestination) return;

            const scrollY = window.scrollY;
            const heroHeight = heroEl.offsetHeight;
            const aboutTop = aboutEl.offsetTop;
            const aboutHeight = aboutEl.offsetHeight;
            const eventsTop = eventsEl.offsetTop;
            const eventsHeight = eventsEl.offsetHeight;
            const placeholderSize = window.innerWidth < 640 ? 120 : 150;
            // Use visualViewport height if available to ignore mobile browser address bar
            const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;

            // Get current viewport positions for all targets with enhanced accuracy
            const initialPos = getViewportPos(circleEl);
            const aboutPos = getViewportPos(aboutDestination);
            const eventsPos = getViewportPos(eventsDestination);

            // Ensure we have valid positions before proceeding
            if (!initialPos || !aboutPos || !eventsPos) return;

            let x = initialPos.x;
            let y = initialPos.y;
            let scale = 1;
            let opacity = 1; // Track opacity for fade effect

            // Define scroll ranges with responsive triggers
            const aboutTriggerStart = aboutTop - viewportHeight * 0.7;
            const aboutTriggerEnd = aboutTop + aboutHeight * 0.3;
            const eventsTriggerStart = eventsTop - viewportHeight * 0.7;
            const eventsTriggerEnd = eventsTop + eventsHeight * 0.3;

            // Define fade-out zone after events section
            const fadeOutStart = eventsTriggerEnd + viewportHeight * 0.1; // Start fading 10% viewport after events end
            const fadeOutEnd = fadeOutStart + viewportHeight * 0.2; // Complete fade over 20% viewport distance

            // Animation state machine with smooth transitions
            if (scrollY < aboutTriggerStart) {
                // Before about section - stay at hero position
                x = initialPos.x;
                y = initialPos.y;
                scale = 1;
                opacity = 1;

            } else if (scrollY >= aboutTriggerStart && scrollY < aboutTriggerEnd) {
                // Hero to About transition
                const totalDistance = aboutTriggerEnd - aboutTriggerStart;
                const progress = Math.min(1, Math.max(0, (scrollY - aboutTriggerStart) / totalDistance));

                // Cubic easing for smooth, natural movement
                const easedProgress = progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                x = initialPos.x + (aboutPos.x - initialPos.x) * easedProgress;
                y = initialPos.y + (aboutPos.y - initialPos.y) * easedProgress;
                scale = 1 + (1.5 * easedProgress); // Scale from 1 to 2.5
                opacity = 1;

            } else if (scrollY >= aboutTriggerEnd && scrollY < eventsTriggerStart) {
                // Between about and events - stay at about position
                x = aboutPos.x;
                y = aboutPos.y;
                scale = 2.5;
                opacity = 1;

            } else if (scrollY >= eventsTriggerStart && scrollY < eventsTriggerEnd) {
                // About to Events transition
                const totalDistance = eventsTriggerEnd - eventsTriggerStart;
                const progress = Math.min(1, Math.max(0, (scrollY - eventsTriggerStart) / totalDistance));

                // Cubic easing for smooth, natural movement
                const easedProgress = progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                x = aboutPos.x + (eventsPos.x - aboutPos.x) * easedProgress;
                y = aboutPos.y + (eventsPos.y - aboutPos.y) * easedProgress;
                scale = 2.5 - (1.0 * easedProgress); // Scale from 2.5 to 1.5
                opacity = 1;

            } else if (scrollY >= eventsTriggerEnd && scrollY < fadeOutStart) {
                // Just after events section - stay at final position, fully visible
                x = eventsPos.x;
                y = eventsPos.y;
                scale = 1.5;
                opacity = 1;

            } else if (scrollY >= fadeOutStart && scrollY < fadeOutEnd) {
                // Fade-out transition zone
                x = eventsPos.x;
                y = eventsPos.y;
                scale = 1.5;

                // Calculate fade progress and apply smooth easing
                const fadeProgress = Math.min(1, Math.max(0, (scrollY - fadeOutStart) / (fadeOutEnd - fadeOutStart)));
                const easedFadeProgress = 1 - Math.pow(1 - fadeProgress, 3); // Ease-out cubic
                opacity = 1 - easedFadeProgress; // Fade from 1 to 0

            } else {
                // Completely past events section - hidden
                x = eventsPos.x;
                y = eventsPos.y;
                scale = 1.5;
                opacity = 0;
            }

            // Apply scale-aware viewport constraints to prevent clipping while maintaining center alignment
            const constrainedPos = constrainToViewport(x, y, placeholderSize, scale);

            // Convert center-based coordinates to top-left for CSS transform
            // Since we use transform-origin: 50% 50%, we offset by half the base size (not scaled size)
            const halfSize = placeholderSize / 2;
            const translateX = Math.round(constrainedPos.x - halfSize);
            const translateY = Math.round(constrainedPos.y - halfSize);

            // Apply smooth transform and opacity with perfect centering
            placeholder.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;

            // Ensure transform-origin remains centered for perfect scaling
            placeholder.style.transformOrigin = '50% 50%';

            // Check if mobile for responsive behavior
            const isMobile = window.innerWidth < 768; // md breakpoint

            // Update opacity and visibility for performance with mobile adjustments
            if (opacity <= 0.01) {
                placeholder.style.opacity = '0';
                placeholder.style.visibility = 'hidden';
            } else {
                // Apply mobile-specific opacity reduction while keeping animation logic intact
                const finalOpacity = isMobile ? opacity * 0.4 : opacity; // 40% of calculated opacity on mobile
                placeholder.style.opacity = finalOpacity.toString();
                placeholder.style.visibility = 'visible';
            }

            // Update z-index responsively to ensure logo stays behind text on mobile
            placeholder.style.zIndex = isMobile ? '10' : '50';
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateAnimation);
                ticking = true;
            }
        };

        lenis.on('scroll', onScroll);

        let rafId;
        const raf = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        // Handle resize and orientation change events
        const handleResize = () => {
            // Reinitialize placeholder position on resize and update responsive behavior
            initializePlaceholder();
            if (!ticking) {
                requestAnimationFrame(updateAnimation);
                ticking = true;
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        // Initialize placeholder and start animation system
        setTimeout(() => {
            initializePlaceholder();
            updateAnimation();
        }, 100); // Small delay to ensure DOM is ready

        return () => {
            lenis.off('scroll', onScroll);
            lenis.destroy();
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
            // Clean up global reference
            if (window.lenis === lenis) {
                window.lenis = null;
            }
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
            {/* Animated logo placeholder for all screens - fixed positioning with enhanced styling */}
            <div
                ref={placeholderRef}
                style={{
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    perspective: '1000px',
                    transformOrigin: '50% 50%'
                }}
                className="fixed top-0 left-0 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] z-50 pointer-events-none flex items-center justify-center"
            >
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-full h-full object-contain rounded-lg shadow-2xl"
                    style={{
                        filter: 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))',
                        imageRendering: 'crisp-edges'
                    }}
                />
            </div>

            {/* Hero Section */}
            {/* ✅ FIX: Modified to use 100vh on mobile, full-vh on desktop */}
            <section ref={heroSectionRef} className="w-full flex flex-col items-center justify-center px-4 h-screen md:full-vh relative z-20 md:z-auto">
                <div ref={heroAnimRef} className="flex flex-col md:flex-row w-full items-center justify-center space-y-10 md:space-y-0 md:space-x-16 transition-transform duration-300 will-change-transform relative z-30 md:z-auto">
                    {/* Left Column: GRITX Title */}
                    <div className="flex flex-col items-center">
                        <div className="text-center font-[Pirata_One] text-lg md:text-2xl uppercase tracking-widest text-gray-300">
                            <div>SRI SAIRAM ENGINEERING COLLEGE</div>
                            <div>NATIONAL SERVICE SCHEME</div>
                            <div className="my-2 font-normal text-gray-100">PRESENTS</div>
                        </div>

                        <div ref={logoRef} className="gritx-title font-[Rye] mt-2 tracking-widest text-5xl md:text-9xl text-gray-200 flex items-center justify-center">
                            <span>G</span><span>R</span><span ref={iRef} className="relative">I</span><span>T</span><span>X</span>&nbsp;<span>8</span><span>.</span><span>0</span>
                        </div>
                    </div>

                    {/* Right Column: Circular animated logos */}
                    <motion.div
                        className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center sm:my-0 my-8"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
                    >
                        <motion.div
                            ref={circleRef}
                            className="absolute inset-0 flex items-center justify-center"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                        >
                            {/* Invisible center reference point for logo positioning */}
                            <div className="w-4 h-4 opacity-0 pointer-events-none"></div>
                        </motion.div>

                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {logos.map((logo, idx) => {
                                const pos = getPosition(idx, logos.length, radius);
                                return (
                                    <motion.div
                                        key={logo.id}
                                        className="pointer-events-auto absolute w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
                                        layout
                                        initial={{ opacity: 0.8, scale: 0.95 }}
                                        animate={{ x: pos.x, y: pos.y, opacity: 1, scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                                    >
                                        <img
                                            src={logo.logo}
                                            alt={logo.label}
                                            className="w-full h-full object-contain rounded-full"
                                            onError={(e) => {
                                                // Fallback to text if image fails to load
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'block';
                                            }}
                                        />
                                        <span className="hidden text-xs font-bold text-white text-center">
                                            {logo.label}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                {/* Countdown Timer */}
                <div className="text-center mt-4 md:mt-8">
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-8">
                        <div className="flex flex-col items-center">
                            <div className="text-xl md:text-5xl font-bold text-white">{timeLeft.days}</div>
                            <div className=" font-[Pirata_One] tracking-widest text-xs md:text-lg uppercase  text-gray-400">Days</div>
                        </div>
                        <div className="text-2xl md:text-5xl font-bold text-gray-600 self-start">:</div>
                        <div className="flex flex-col items-center">
                            <div className="text-xl md:text-5xl font-bold text-white">{timeLeft.hours}</div>
                            <div className=" font-[Pirata_One] tracking-widest text-xs md:text-lg uppercase  text-gray-400">Hours</div>
                        </div>
                        <div className="text-2xl md:text-5xl font-bold text-gray-600 self-start">:</div>
                        <div className="flex flex-col items-center">
                            <div className="text-xl md:text-5xl font-bold text-white">{timeLeft.minutes}</div>
                            <div className=" font-[Pirata_One] tracking-widest text-xs md:text-lg uppercase  text-gray-400">Minutes</div>
                        </div>
                        <div className="sm:block hidden text-2xl md:text-5xl font-bold text-gray-600 self-start">:</div>
                        <div className="hidden sm:flex flex-col items-center">
                            <div className="text-2xl md:text-5xl font-bold text-white">{timeLeft.seconds}</div>
                            <div className=" font-[Pirata_One] tracking-widest text-xs md:text-lg uppercase  text-gray-400">Seconds</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section ref={aboutSectionRef} className="w-full flex flex-col space-y-20 sm:space-y-0 md:flex-row items-center justify-center py-16 px-4 full-vh relative z-20 md:z-auto">
                <div ref={aboutDestinationRef} className="w-full md:w-2/6 flex items-center justify-center min-h-[200px] sm:min-h-[300px]">
                    {/* Placeholder destination - animated placeholder will move here */}
                </div>
                <div className="w-full md:w-4/6 pr-0 md:px-16 mb-8 md:mb-0 relative z-30 md:z-auto">
                    <h2 className="font-[Rye] text-3xl md:text-4xl font-medium tracking-wider mb-4">About GRITX 8.0</h2>
                    <p className="text-gray-300  font-[Pirata_One] tracking-widest text-xl md:text-2xl">
                        GRITX represents the pinnacle of design and engineering. Our philosophy is rooted in precision, strength, and a forward-thinking approach to solve complex challenges. We build solutions that are not only robust but also elegant and intuitive.
                    </p>
                </div>
            </section>

            {/* Events Section */}
            <section ref={eventsSectionRef} className="w-full flex flex-col items-center justify-center py-16 px-4 full-vh relative z-20 md:z-auto">
                <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
                    <div className="w-full md:w-5/12 p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700 relative z-30 md:z-auto">
                        <h3 className="text-2xl font-[Rye] tracking-widest font-bold mb-4 text-cyan-300">Tech Events</h3>
                        <p className="text-gray-300 font-[Pirata_one] tracking-widest text-xl">
                            Join our hackathons, workshops, and tech talks. Dive deep into the latest technologies and collaborate with brilliant minds from around the world.
                        </p>
                    </div>
                    <div ref={eventsDestinationRef} className="w-full md:w-2/12 h-[100px] flex-shrink-0 flex items-center justify-center">
                        {/* Placeholder destination - animated placeholder will move here */}
                    </div>
                    <div className="w-full md:w-5/12 p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700 relative z-30 md:z-auto">
                        <h3 className="text-2xl font-[Rye] tracking-widest font-bold mb-4 text-fuchsia-300">Non Tech Events</h3>
                        <p className="text-gray-300 font-[Pirata_one] tracking-widest text-xl">
                            Engage in community-building activities, creative challenges, and networking sessions that foster growth and connection beyond the code.
                        </p>
                    </div>
                </div>
            </section>

            {/* Events Carousel Section */}
            <section className="w-full flex flex-col items-center justify-center py-20 px-4">
                <div className="w-full max-w-6xl mx-auto text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-medium mb-6 font-[Rye] tracking-widest">
                        Explore Our Events
                    </h2>
                    <p className="text-gray-300 text-lg md:text-2xl max-w-4xl font-[Pirata_one] tracking-widest mx-auto">
                        Discover the diverse range of competitions, workshops, and activities that make GRITX 8.0 an unforgettable experience. Each event is designed to challenge, inspire, and celebrate innovation.
                    </p>
                </div>
                <div className="w-full flex justify-center">
                    <PerspectiveCarousel items={eventsData} />
                </div>
            </section>

            {/* Bento Grid Section */}
            <section className="w-full py-20 px-4">
                <div className="w-full max-w-6xl mx-auto text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                        Discover & Explore
                    </h2>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
                        Dive into our curated collection of projects, innovations, and community-driven initiatives that define our vision for the future.
                    </p>
                </div>
                <BentoGrid />
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