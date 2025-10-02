import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaUsers } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Floating Video Component
const FloatingVideo = ({ index, isMobile }) => {
    const baseDelay = index * 0.2;
    // ✅ FIX: Define a buffer to ensure videos don't go off-screen
    const buffer = 80;

    return (
        <motion.video
            className="fixed pointer-events-none z-10"
            style={{
                width: isMobile ? '40px' : '56px',
                height: isMobile ? '40px' : '56px',
                objectFit: 'cover',
                borderRadius: '6px',
                mixBlendMode: 'screen',
                filter: `hue-rotate(${index * 60}deg)`
            }}
            animate={{
                // ✅ FIX: Subtract buffer from window width/height to prevent overflow
                x: [
                    Math.random() * (window.innerWidth - buffer),
                    Math.random() * (window.innerWidth - buffer),
                    Math.random() * (window.innerWidth - buffer),
                    Math.random() * (window.innerWidth - buffer)
                ],
                y: [
                    Math.random() * (window.innerHeight - buffer),
                    Math.random() * (window.innerHeight - buffer),
                    Math.random() * (window.innerHeight - buffer),
                    Math.random() * (window.innerHeight - buffer)
                ],
                rotate: [0, 180, 360, 540],
                scale: [0.8, 1.2, 0.9, 1.1]
            }}
            transition={{
                duration: 8,
                delay: baseDelay,
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.33, 0.66, 1]
            }}
            initial={{
                opacity: 0.6,
                // ✅ FIX: Use the same corrected logic for initial position
                x: Math.random() * (window.innerWidth - buffer),
                y: Math.random() * (window.innerHeight - buffer)
            }}
            autoPlay
            loop
            muted
            playsInline
        >
            <source src="/animation.mp4" type="video/mp4" />
        </motion.video>
    );
};

export default function AnimatedEventPage({ eventData }) {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
    const isMobile = width < 768;
    const numberOfVideos = isMobile ? 3 : 4;

    // Handle both array and single event object
    const event = Array.isArray(eventData) ? eventData[0] : eventData;

    // Safety check - return early if no event data
    if (!event) {
        return (
            <div className="text-white bg-black min-h-screen flex items-center justify-center">
                <p className="text-xl">No event data available</p>
            </div>
        );
    }

    useEffect(() => {
        AOS.init({
            duration: 400,
            easing: 'ease-out-quart',
            once: false,
            mirror: true,
            offset: 50,
            delay: 0
        });

        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            AOS.refresh();
        };
    }, []);

    return (
        // ✅ FIX: Added overflow-x-hidden to the root container to prevent any horizontal scroll
        <div className="text-white bg-black min-h-screen overflow-x-hidden">
            {Array.from({ length: numberOfVideos }).map((_, index) => (
                <FloatingVideo key={index} index={index} isMobile={isMobile} />
            ))}

            <div className="relative z-20">
                {/* Section 1: Header */}
                <motion.div
                    className="flex flex-col items-center justify-center min-h-screen sm:p-6 md:p-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <motion.img
                        src={event.logoUrl}
                        alt={`${event.name} Logo`}
                        className="w-28 h-28 sm:w-20 sm:h-20 md:w-32 md:h-32 rounded-full bg-gray-800 shadow-md border border-gray-700 mb-4 sm:mb-6"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
                        whileHover={{ scale: 1.15, rotate: 10, transition: { duration: 0.2 } }}
                    />
                    <motion.h1
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium font-[rye] tracking-widest text-white text-center px-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        {event.name}
                    </motion.h1>
                    <motion.p
                        className="mt-3 sm:mt-4 text-sm sm:text-base font-[pirata_one] tracking-widest md:text-lg lg:text-2xl text-gray-300 leading-relaxed text-center max-w-2xl sm:max-w-lg md:max-w-4xl lg:max-w-6xl mx-auto px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                    >
                        {event.description}
                    </motion.p>
                    <motion.a
                        href="https://forms.gle/YOUR-FORM-ID-HERE" // <-- Replace with your Google Form link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg rounded-full shadow-lg transition-all duration-300 hover:shadow-purple-500/50"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Register Now
                    </motion.a>
                </motion.div>

                {/* Section 2: Event Rounds */}
                <motion.div
                    className="py-16 px-4 sm:px-6 md:px-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl font-medium font-[rye] tracking-widest text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.4 }}
                    >
                        Event Rounds
                    </motion.h2>
                    <div className="space-y-8 max-w-7xl mx-auto">
                        {event.rounds && event.rounds.map((round, index) => (
                            <motion.div
                                key={round.id}
                                className="bg-gradient-to-br from-gray-600 via-gray-700 to-gray-900 border border-gray-700 p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl"
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, amount: 0.2 }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.05,
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 25
                                }}
                                whileHover={{
                                    scale: 1.02,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-medium font-[rye] tracking-widest text-white mb-4 text-center">
                                    {round.title}
                                </h3>
                                <p className="text-base sm:text-base md:text-xl text-gray-300 leading-relaxed text-center font-[pirata_one] tracking-widest">
                                    {round.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Section 3: Prizes & Details */}
                <motion.div
                    className="py-16 px-4 sm:px-6 md:px-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl font-medium font-[rye] tracking-widest mb-12 text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.4 }}
                    >
                        Prizes & Details
                    </motion.h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        <motion.div
                            className="bg-gradient-to-br from-yellow-600 via-yellow-700 to-yellow-800 p-6 rounded-2xl text-center border border-yellow-500 shadow-xl"
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.3, delay: 0.05, type: "spring", stiffness: 300 }}
                            whileHover={{
                                scale: 1.08,
                                rotate: 3,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.3, rotate: 20, transition: { duration: 0.15 } }}
                            >
                                <FaTrophy className="mx-auto text-white mb-3" size={isMobile ? 32 : 40} />
                            </motion.div>
                            <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-white mb-2">1st Prize</h3>
                            <p className="text-yellow-100 text-sm sm:text-base">{event.details?.prizes?.first || 'TBD'}</p>
                        </motion.div>

                        <motion.div
                            className="bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700 p-6 rounded-2xl text-center border border-gray-400 shadow-xl"
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.3, delay: 0.1, type: "spring", stiffness: 300 }}
                            whileHover={{
                                scale: 1.08,
                                rotate: -3,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.3, rotate: -20, transition: { duration: 0.15 } }}
                            >
                                <FaTrophy className="mx-auto text-white mb-3" size={isMobile ? 32 : 40} />
                            </motion.div>
                            <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-white mb-2">2nd Prize</h3>
                            <p className="text-gray-100 text-sm sm:text-base">{event.details?.prizes?.second || 'TBD'}</p>
                        </motion.div>

                        <motion.div
                            className="bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 p-6 rounded-2xl text-center border border-amber-500 shadow-xl"
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.3, delay: 0.15, type: "spring", stiffness: 300 }}
                            whileHover={{
                                scale: 1.08,
                                rotate: 3,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.3, rotate: 20, transition: { duration: 0.15 } }}
                            >
                                <FaTrophy className="mx-auto text-white mb-3" size={isMobile ? 32 : 40} />
                            </motion.div>
                            <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-white mb-2">3rd Prize</h3>
                            <p className="text-amber-100 text-sm sm:text-base">{event.details?.prizes?.third || 'TBD'}</p>
                        </motion.div>

                        <motion.div
                            className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-6 rounded-2xl text-center border border-blue-500 shadow-xl"
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.3, delay: 0.2, type: "spring", stiffness: 300 }}
                            whileHover={{
                                scale: 1.08,
                                rotate: -3,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.3, rotate: -20, transition: { duration: 0.15 } }}
                            >
                                <FaUsers className="mx-auto text-white mb-3" size={isMobile ? 32 : 40} />
                            </motion.div>
                            <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-white mb-2">Team Size</h3>
                            <p className="text-blue-100 text-sm sm:text-base">{event.details?.teamSize || 'TBD'}</p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Section 4: Coordinators */}
                <motion.div
                    className="py-16 px-4 sm:px-6 md:px-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl font-medium font-[rye] tracking-widest mb-12 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.4 }}
                    >
                        Meet the Coordinators
                    </motion.h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {event.coordinators && event.coordinators.map((coordinator, index) => (
                            <motion.div
                                key={coordinator.id}
                                className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-8 rounded-2xl text-center border border-gray-700 shadow-2xl"
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.2 }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.08,
                                    type: "spring",
                                    stiffness: 250,
                                    damping: 25
                                }}
                                whileHover={{
                                    scale: 1.06,
                                    y: -5,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <motion.div
                                    className="relative mb-6"
                                    whileHover={{ scale: 1.15, transition: { duration: 0.2 } }}
                                >
                                    <motion.img
                                        src={coordinator.imageUrl}
                                        alt={coordinator.name}
                                        className="w-32 h-32 mx-auto rounded-full border-4 border-gradient-to-r from-blue-500 to-purple-600 shadow-xl"
                                        initial={{ scale: 0.8, rotate: -45 }}
                                        whileInView={{ scale: 1, rotate: 0 }}
                                        viewport={{ once: false }}
                                        transition={{ duration: 0.4, delay: index * 0.05 + 0.1 }}
                                        whileHover={{ rotate: 8, transition: { duration: 0.15 } }}
                                    />
                                    <motion.div
                                        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-0"
                                        whileHover={{ opacity: 0.2, transition: { duration: 0.2 } }}
                                    />
                                </motion.div>
                                <motion.h3
                                    className="text-xl sm:text-2xl font-medium font-[pirata_one] tracking-widest text-white mb-2"
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false }}
                                    transition={{ delay: index * 0.05 + 0.2, duration: 0.3 }}
                                >
                                    {coordinator.name}
                                </motion.h3>

                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}