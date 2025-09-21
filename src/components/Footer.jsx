import React from 'react';
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className='bg-gray-900 text-white pt-8 pb-6 relative z-10'>
            <div className='container mx-auto flex flex-col lg:flex-row justify-between items-start px-4 lg:px-8'>

                {/* Contact Info Div */}
                <div className='w-full lg:w-1/3 mb-8 lg:mb-0 text-center lg:text-left'>
                    <h2 className='text-xl font-bold mb-4 text-white'>Get In Touch</h2>
                    <div className='mb-6'>
                        <p className='text-gray-300 mb-2 text-sm lg:text-base'>
                            <span className='font-semibold'>Email:</span> info@gritx.com
                        </p>
                        <p className='text-gray-300 mb-2 text-sm lg:text-base'>
                            <span className='font-semibold'>Phone:</span> +1 (555) 123-4567
                        </p>
                        <p className='text-gray-300 text-sm lg:text-base'>
                            <span className='font-semibold'>Address:</span> 123 Tech Street, Innovation City, IC 12345
                        </p>
                    </div>
                    {/* Social Media Links */}
                    <div className='flex justify-center lg:justify-start space-x-6'>
                        <a
                            href="https://instagram.com/gritx"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='text-gray-300 hover:text-pink-400 transition-colors duration-200 text-2xl'
                            aria-label="Instagram"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://linkedin.com/company/gritx"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='text-gray-300 hover:text-blue-400 transition-colors duration-200 text-2xl'
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            href="mailto:info@gritx.com"
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
                        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3'>GRITX</h1>
                        
                    </div>

                    {/* Team Members */}
                    <div className='text-center w-full'>
                        <h3 className='text-lg font-semibold text-white mb-4'>Our Team</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2 text-gray-300 text-sm'>
                            <p className='hover:text-white transition-colors duration-200'>John Smith - +1 (555) 123-4567</p>
                            <p className='hover:text-white transition-colors duration-200'>Sarah Johnson - +1 (555) 123-4567</p>
                            <p className='hover:text-white transition-colors duration-200'>Mike Chen - +1 (555) 123-4567</p>
                            <p className='hover:text-white transition-colors duration-200'>Emily Davis - +1 (555) 123-4567</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Div */}
                <div className='w-full lg:w-1/3 text-center lg:text-right'>
                    <h2 className='text-xl font-bold mb-6 text-white'>Quick Links</h2>

                    {/* Navigation Links */}
                    <div className='mb-6'>
                        <ul className='flex flex-wrap justify-center lg:justify-end gap-4 lg:flex-col lg:gap-3 text-gray-300'>
                            <li>
                                <a href="/" className='hover:text-white transition-colors duration-200 text-sm lg:text-base'>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/events" className='hover:text-white transition-colors duration-200 text-sm lg:text-base'>
                                    Events
                                </a>
                            </li>
                            <li>
                                <a href="/about" className='hover:text-white transition-colors duration-200 text-sm lg:text-base'>
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className='hover:text-white transition-colors duration-200 text-sm lg:text-base'>
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