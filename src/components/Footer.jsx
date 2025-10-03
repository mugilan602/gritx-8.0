import React from 'react';
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useSectionContext } from '../context/SectionContext.jsx';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
    const { heroSectionRef, aboutSectionRef, footerRef, scrollToSection } = useSectionContext();
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavClick = (e, section) => {
        e.preventDefault();

        const doScroll = (section) => {
            if (section === 'hero') scrollToSection(heroSectionRef);
            if (section === 'about') scrollToSection(aboutSectionRef);
            if (section === 'footer') scrollToSection(footerRef);
        };

        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => doScroll(section), 100);
        } else {
            doScroll(section);
        }
    };

    return (
        <footer className='bg-gray-900 text-white pt-8 pb-6 relative z-10'>
            <div className='container mx-auto flex flex-col lg:flex-row justify-between items-start px-4 lg:px-8'>

                {/* Contact Info Div */}
                <div className='w-full lg:w-1/3 mb-8 lg:mb-0 text-center lg:text-left'>
                    <h2 className='text-xl mb-4  font-[rye] tracking-widest font-medium text-white'>Get In Touch</h2>
                    <div className='mb-6 font-[pirata_one] tracking-widest'>
                        <p className='text-gray-300 mb-2 text-sm lg:text-lg'>
                            <span className='font-normal'>Email:</span> gritxnss@sairam.edu.in
                        </p>
                        <p className='text-gray-300 text-sm lg:text-lg'>
                            <span className='font-normal'>Address: <br /></span> Sai Leo Nagar, West Tambaram, <br />
                            Chennai – 600 044. <br />
                            Tamil Nadu. India.
                        </p>
                    </div>
                    {/* Social Media Links */}
                    <div className='flex justify-center lg:justify-start space-x-6'>
                        <a
                            href="https://www.instagram.com/sairamnss?igsh=Z2tlMWJmMzM3a3k="
                            target="_blank"
                            rel="noopener noreferrer"
                            className='text-gray-300 hover:text-pink-400 transition-colors duration-200 text-2xl'
                            aria-label="Instagram"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://www.linkedin.com/company/nss-sairam/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='text-gray-300 hover:text-blue-400 transition-colors duration-200 text-2xl'
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            href="mailto:gritxnss@sairam.edu.in"
                            className='text-gray-300 hover:text-red-400 transition-colors duration-200 text-2xl'
                            aria-label="Email"
                        >
                            <FaEnvelope />
                        </a>
                    </div>
                </div>

                {/* Logo and Brand Div */}
                <div className='w-full lg:w-1/3 mb-8 lg:mb-0 flex flex-col items-center'>
                    <div className='text-center'>
                        <h1 className='text-3xl md:text-4xl lg:text-5xl font-[rye] tracking-wider font-medium text-white mb-3'>GRITX</h1>

                    </div>

                    {/* Team Members */}
                    <div className='text-center w-full font-[pirata_one] tracking-widest'>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2 text-gray-300 text-lg'>
                            <p className='hover:text-white transition-colors duration-200'>Raghulnath P L - +91 6385 409 302</p>
                            <p className='hover:text-white transition-colors duration-200'>Eswar S - +91 8489 539 985</p>
                            <p className='hover:text-white transition-colors duration-200'>Vijay Athithya S V - +91 9655 576 569</p>
                            <p className='hover:text-white transition-colors duration-200'>Parthipan V S - +91 902 5603 385</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Div */}
                <div className='w-full lg:w-1/3 text-center lg:text-right'>
                    <h2 className='text-xl  font-[rye] tracking-widest font-medium mb-6 text-white'>Quick Links</h2>

                    {/* Navigation Links */}
                    <div className='mb-6 font-[Pirata_One] tracking-widest'>
                        <ul className='flex flex-wrap justify-center lg:justify-end gap-4 lg:flex-col lg:gap-3 text-gray-300'>
                            <li>
                                <a href="/" onClick={(e) => handleNavClick(e, 'hero')} className='hover:text-white transition-colors duration-200 text-sm lg:text-lg'>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/events" onClick={() => navigate('/events')} className='hover:text-white transition-colors duration-200 text-sm lg:text-lg'>
                                    Events
                                </a>
                            </li>
                            <li>
                                <a href="/about" onClick={(e) => handleNavClick(e, 'about')} className='hover:text-white transition-colors duration-200 text-sm lg:text-lg'>
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="/contact" onClick={(e) => handleNavClick(e, 'footer')} className='hover:text-white transition-colors duration-200 text-sm lg:text-lg'>
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className='border-t border-gray-700 md:mt-8 pt-6'>
                <div className='container mx-auto px-4 lg:px-8 flex flex-col sm:flex-row justify-center items-center text-xs sm:text-sm text-gray-400'>
                    <p className='text-center'>
                        © {new Date().getFullYear()} GRITX. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;