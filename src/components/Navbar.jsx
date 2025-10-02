import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useSectionContext } from '../context/SectionContext.jsx';

const navLinks = [
    { name: 'Home', path: '/', section: 'hero' },
    { name: 'About', path: '/about', section: 'about' },
    { name: 'Events', path: '/events' },
    { name: 'Contact', path: '/contact', section: 'footer' }
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { heroSectionRef, aboutSectionRef, footerRef, scrollToSection } = useSectionContext();

    const handleNavClick = (e, link) => {
        e.preventDefault();
        closeMenu();

        if (link.path === '/events') {
            navigate('/events');
            return;
        }

        const doScroll = (section) => {
            if (section === 'hero') scrollToSection(heroSectionRef);
            if (section === 'about') scrollToSection(aboutSectionRef);
            if (section === 'footer') scrollToSection(footerRef);
        };

        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => doScroll(link.section), 100);
        } else {
            doScroll(link.section);
        }
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                closeMenu();
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    return (
        <>
            {/* --- Universal Hamburger Button --- */}
            <motion.button
                onClick={toggleMenu}
                className="fixed top-3 right-3 md:top-4 md:right-4 z-[100] text-white md:text-2xl text-lg p-2 md:p-3 bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle menu"
                whileTap={{ scale: 0.9 }}
            >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
            </motion.button>

            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* --- Desktop Sidebar Menu (md and up) --- */}
                        <motion.div
                            key="desktop-menu"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="hidden md:block fixed top-0 right-0 h-full w-[40vw] bg-gray-900/30 backdrop-blur-xl z-[99] shadow-2xl"
                        >
                            <div className="flex flex-col items-center justify-center h-full space-y-10">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                    >
                                        <a
                                            href={link.path}
                                            onClick={(e) => handleNavClick(e, link)}
                                            className={` font-[Pirata_One] tracking-widest text-5xl font-medium transition-colors duration-300
                                                ${location.pathname === link.path && !link.section
                                                    ? 'text-blue-400'
                                                    : 'text-gray-200 hover:text-white'
                                                }
                                            `}
                                        >
                                            {link.name}
                                        </a>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* --- Mobile Full-screen Menu (sm) --- */}
                        <motion.div
                            key="mobile-menu"
                            initial={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
                            animate={{ opacity: 1, clipPath: 'circle(150% at 95% 5%)' }}
                            exit={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="md:hidden fixed inset-0 bg-gray-900/30 backdrop-blur-xl flex flex-col items-center justify-center z-[99]"
                        >
                            <div className="flex flex-col items-center space-y-8">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                    >
                                        <a
                                            href={link.path}
                                            onClick={(e) => handleNavClick(e, link)}
                                            className={` font-[pirata_one] tracking-widest text-4xl font-medium transition-colors duration-300
                                                ${location.pathname === link.path && !link.section
                                                    ? 'text-blue-400'
                                                    : 'text-gray-200 hover:text-white'
                                                }
                                            `}
                                        >
                                            {link.name}
                                        </a>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;