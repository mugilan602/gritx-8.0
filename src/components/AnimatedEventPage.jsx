import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaUsers } from 'react-icons/fa';
import { ChevronsDown } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PhotoCard from './PhotoCard';

// Floating Video Component
const FloatingVideo = ({ index, isMobile }) => {
    const baseDelay = index * 0.2;
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
    const [showScrollIcon, setShowScrollIcon] = useState(true);
    const isMobile = width < 768;
    const numberOfVideos = isMobile ? 3 : 4;

    const event = Array.isArray(eventData) ? eventData[0] : eventData;

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
        const handleScroll = () => {
            if (window.scrollY > 50) setShowScrollIcon(false);
            else setShowScrollIcon(true);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
            AOS.refresh();
        };
    }, []);

    return (
        <div className="text-white bg-black min-h-screen overflow-x-hidden relative">
            {Array.from({ length: numberOfVideos }).map((_, index) => (
                <FloatingVideo key={index} index={index} isMobile={isMobile} />
            ))}

            {/* ✅ Mobile Scroll Indicator */}
            {showScrollIcon && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="fixed bottom-0 left-1/2 transform -translate-x-1/2 text-white animate-bounce z-50"
                >
                    <ChevronsDown size={48} />
                </motion.div>
            )}

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
                        href={event.gform}
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
                        <motion.div
                            className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 p-6 rounded-2xl text-center border border-green-500 shadow-xl"
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.3, delay: 0.0, type: "spring", stiffness: 300 }}
                            whileHover={{
                                scale: 1.08,
                                rotate: -2,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.3, rotate: -15, transition: { duration: 0.15 } }}
                            >
                                <div className="text-white text-3xl sm:text-4xl mb-3 mx-auto">💰</div>
                            </motion.div>
                            <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-white mb-2">Entry Fee</h3>
                            <p className="text-green-100 text-sm sm:text-base">{event.details?.entryFee || 'Free'}</p>
                        </motion.div>

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
                            <p className="text-yellow-100 text-sm sm:text-base">{event.details?.prizes?.first || '-'}</p>
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
                            <p className="text-gray-100 text-sm sm:text-base">{event.details?.prizes?.second || '-'}</p>
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
                            <p className="text-amber-100 text-sm sm:text-base">{event.details?.prizes?.third || '-'}</p>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {event.coordinators && event.coordinators.map((coordinator, index) => (
                            <motion.div
                                key={coordinator.id}
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.2 }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 250,
                                    damping: 25
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    y: -5,
                                    transition: { duration: 0.2 }
                                }}
                                className="relative"
                            >
                                <PhotoCard
                                    imageUrl={coordinator.imageUrl}
                                    name={coordinator.name}
                                />
                                {coordinator.role && (
                                    <motion.div
                                        className="mt-3 text-center"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: false }}
                                        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                                    >
                                        <p className="text-gray-300 text-sm font-medium">{coordinator.role}</p>
                                        {coordinator.phone && (
                                            <p className="text-gray-400 text-xs mt-1">{coordinator.phone}</p>
                                        )}
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
