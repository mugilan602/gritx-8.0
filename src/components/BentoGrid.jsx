import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const BentoGrid = () => {
    // This effect injects the CSS keyframes for the marquee animation.
    React.useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
      @keyframes scroll-left {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-100%); }
      }
      @keyframes scroll-right {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(0%); }
      }
      .animate-scroll-left { animation: scroll-left 25s linear infinite; }
      .animate-scroll-right { animation: scroll-right 25s linear infinite; }
      .group:hover .animate-scroll-left,
      .group:hover .animate-scroll-right {
        animation-play-state: paused;
      }
    `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const partnerLogos = Array.from({ length: 19 }, (_, i) => (
        <div key={`logo-${i + 1}`} className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center mx-2">
            <img
                src={`/logo${i + 1}.png`}
                alt={`Partner ${i + 1}`}
                className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextSibling;
                    if (fallback) {
                        fallback.style.display = 'flex';
                    }
                }}
            />
            <div className="hidden w-full h-full bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 rounded-lg items-center justify-center text-xs font-bold text-white">
                {i + 1}
            </div>
        </div>
    ));

    return (
        <>
            <div className="w-full max-w-8xl mx-auto px-4 md:px-8 py-8">
                {/* ✅ FIX: Removed fixed row height (lg:auto-rows-[350px]) to allow content to define height */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

                    {/* Card 1: About Institution */}
                    {/* ✅ FIX: Made card a flex-col to manage vertical space */}
                    <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-white/10 hover:shadow-xl transition-all duration-300 group flex flex-col">
                        <div className="flex justify-between items-center gap-3 mb-6 cursor-pointer">
                            <h3 className="text-xl md:text-2xl font-[Rye] tracking-widest font-medium text-white group-hover:text-cyan-400 transition-colors duration-300">
                                About Institution
                            </h3>
                            <span className="text-cyan-400 text-xl group-hover:translate-x-1 transition-transform duration-300"><ArrowUpRight /></span>
                        </div>
                        {/* ✅ FIX: Added flex-1 to make this content area fill available space */}
                        <div className="flex flex-col sm:flex-row gap-6 items-start flex-1">
                            <div className="w-full sm:w-1/2 h-48 md:h-56 lg:h-full flex-shrink-0">
                                <img
                                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&crop=entropy&auto=format"
                                    alt="Featured Project"
                                    className="w-full h-full object-cover rounded-xl shadow-md"
                                />
                            </div>
                            <div className="w-full sm:w-1/2 flex flex-col justify-center">
                                <h4 className="text-lg md:text-xl font-medium text-white mb-4 font-[Rye] tracking-widest">
                                    Sri Sairam Engineering College
                                </h4>
                                <p className="text-gray-300 font-[Poppins] tracking-wider text-sm md:text-base leading-relaxed">
                                    Discover cutting-edge technologies and modern development practices that shape the future of web applications.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Events Marquee */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg border border-white/10 hover:shadow-xl transition-all duration-300 group overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center gap-3 mb-4 md:mb-6 cursor-pointer">
                            <h3 className="text-xl md:text-2xl font-[Rye] tracking-widest font-medium text-white group-hover:text-fuchsia-400 transition-colors duration-300">
                                Events
                            </h3>
                            <span className="text-fuchsia-400 text-lg group-hover:translate-x-1 transition-transform duration-300"><ArrowUpRight /></span>
                        </div>
                        <div className="space-y-4 flex-1 flex flex-col justify-center">
                            <div className="relative overflow-hidden">
                                <div className="flex">
                                    {Array.from({ length: 2 }).map((_, i) => (
                                        <div key={`scroll-left-${i}`} className="flex-shrink-0 flex items-center animate-scroll-left whitespace-nowrap">
                                            {partnerLogos}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative overflow-hidden">
                                <div className="flex">
                                    {Array.from({ length: 2 }).map((_, i) => (
                                        <div key={`scroll-right-${i}`} className="flex-shrink-0 flex items-center animate-scroll-right whitespace-nowrap">
                                            {partnerLogos}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Design Animation */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg border border-white/10 transition-all duration-300 group flex flex-col">
                        <div className="flex justify-between items-center gap-3 mb-4 md:mb-6 cursor-pointer">
                            <h3 className="text-xl md:text-2xl font-[Rye] tracking-widest font-medium text-white group-hover:text-green-400 transition-colors duration-300">
                                Design
                            </h3>
                            <span className="text-green-400 text-lg group-hover:translate-x-1 transition-transform duration-300"><ArrowUpRight /></span>
                        </div>
                        <div className="flex items-center justify-center flex-1 py-4">
                            <div className="relative w-full h-full max-w-[250px] aspect-square flex items-center justify-center">
                                <motion.div className="absolute w-full h-full border border-dashed border-white/20 rounded-full" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }}>
                                    <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/10  rounded-full shadow-lg" whileHover={{ scale: 1.15 }}>
                                        <img src="/logo2.png" alt="Outer Logo" className="object-contain filter drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]" />
                                    </motion.div>
                                </motion.div>
                                <motion.div className="absolute w-3/5 h-3/5 border border-dashed border-white/20 rounded-full" animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }}>
                                    <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/10  rounded-full shadow-lg" whileHover={{ scale: 1.15 }}>
                                        <img src="/logo2.png" alt="Inner Logo" className="object-contain filter drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]" />
                                    </motion.div>
                                </motion.div>
                                <motion.div className="w-16 h-16 bg-white/10 p-2.5 rounded-full shadow-xl flex items-center justify-center z-10" whileHover={{ scale: 1.15 }}>
                                    <img src="/logo.png" alt="Center Logo" className="object-contain filter drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Card 4: About NSS */}
                    <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-white/10 hover:shadow-xl transition-all duration-300 group flex flex-col">
                        <div className="flex justify-between items-center gap-3 mb-6 cursor-pointer">
                            <h3 className="text-xl md:text-2xl font-[Rye] tracking-widest font-medium text-white group-hover:text-orange-400 transition-colors duration-300">
                                About Our NSS
                            </h3>
                            <span className="text-orange-400 text-xl group-hover:translate-x-1 transition-transform duration-300"><ArrowUpRight /></span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-6 items-start flex-1">
                            <div className="w-full sm:w-1/2 h-48 md:h-56 lg:h-full flex-shrink-0">
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&crop=entropy&auto=format"
                                    alt="Community Impact"
                                    className="w-full h-full object-cover rounded-xl shadow-md"
                                />
                            </div>
                            <div className="w-full sm:w-1/2 flex flex-col justify-center">
                                <h4 className="text-lg md:text-xl font-medium text-white mb-4 font-[Rye] tracking-widest">
                                    Sri Sairam Engineering College
                                </h4>
                                <p className="text-gray-300 font-[Poppins] tracking-wider text-sm md:text-base leading-relaxed">
                                    Discover cutting-edge technologies and modern development practices that shape the future of web applications.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Second Grid Section */}
            <div className='mt-8 w-full max-w-8xl mx-auto px-4 md:px-8'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>
                    <img className='w-full h-full object-cover rounded-xl' src="/mockup.png" alt="Mockup 1" />
                    <img className='w-full h-full object-cover rounded-xl' src="/mockup3.png" alt="Mockup 2" />
                </div>
            </div>
        </>
    );
};

export default BentoGrid;