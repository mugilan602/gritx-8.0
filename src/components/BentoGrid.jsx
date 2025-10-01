import React from 'react';

const BentoGrid = () => {
    // This effect injects the CSS keyframes for the marquee animation.
    React.useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
      @keyframes scroll-left {
        0% {
          transform: translateX(0%);
        }
        100% {
          transform: translateX(-100%);
        }
      }
      
      @keyframes scroll-right {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(0%);
        }
      }
      
      .animate-scroll-left {
        animation: scroll-left 25s linear infinite;
      }
      
      .animate-scroll-right {
        animation: scroll-right 25s linear infinite;
      }
      
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

    // ✅ FIX: Added `mx-2` to each logo item for consistent horizontal margin.
    const partnerLogos = Array.from({ length: 11 }, (_, i) => (
        <div key={`logo-${i + 1}`} className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16  rounded-lg  flex items-center justify-center mx-2">
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
        <div className="w-full max-w-7xl mx-auto p-2 md:p-4 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:auto-rows-[350px]">

                {/* Card 1: Featured Project */}
                <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-white/10 hover:shadow-xl transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-6 cursor-pointer">
                        <h3 className="text-xl md:text-2xl font-[Rye] tracking-widest font-medium text-white group-hover:text-cyan-400 transition-colors duration-300">
                            About Institution
                        </h3>
                        <span className="text-cyan-400 text-xl group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6 items-start h-full">
                        <div className="w-full sm:w-1/2 flex-shrink-0">
                            <img
                                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&crop=entropy&auto=format"
                                alt="Featured Project"
                                className="w-full h-48 md:h-56 object-cover rounded-xl shadow-md"
                            />
                        </div>
                        <div className="w-full sm:w-1/2 flex flex-col justify-center">
                            <h4 className="text-lg md:text-xl font-medium text-white mb-3 font-[Rye] tracking-widest">
                                Sri Sairam Engineering College
                            </h4>
                            <p className="text-gray-300  font-[Poppins] tracking-wider text-base md:text-xl mb-4">
                                Discover cutting-edge technologies and modern development practices that shape the future of web applications.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card 2: Logo Marquee */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg border border-white/10 hover:shadow-xl transition-all duration-300 group overflow-hidden">
                    <div className="flex items-center gap-3 mb-4 md:mb-6 cursor-pointer">
                        <h3 className="text-xl md:text-2xl font-[Rye] tracking-widest font-medium text-white group-hover:text-fuchsia-400 transition-colors duration-300">
                            Events
                        </h3>
                        <span className="text-fuchsia-400 text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                    <div className="space-y-4 flex-grow flex flex-col justify-center">
                        <div className="relative overflow-hidden">
                            <div className="flex">
                                {Array.from({ length: 2 }).map((_, i) => (
                                    // ✅ FIX: Removed `space-x-4` from the container.
                                    <div key={`scroll-left-${i}`} className="flex-shrink-0 flex items-center animate-scroll-left whitespace-nowrap">
                                        {partnerLogos}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative overflow-hidden">
                            <div className="flex">
                                {Array.from({ length: 2 }).map((_, i) => (
                                    // ✅ FIX: Removed `space-x-4` from the container.
                                    <div key={`scroll-right-${i}`} className="flex-shrink-0 flex items-center animate-scroll-right whitespace-nowrap">
                                        {partnerLogos}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 3: Design */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg border border-white/10 hover:shadow-xl transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-4 md:mb-6 cursor-pointer">
                        <h3 className="text-xl md:text-2xl font-[Rye] tracking-widest font-medium text-white group-hover:text-green-400 transition-colors duration-300">
                            Design
                        </h3>
                        <span className="text-green-400 text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                    <div className="flex items-center justify-center h-full pb-10">
                        <img
                            src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&crop=entropy&auto=format"
                            alt="Design"
                            className="w-full h-full object-cover rounded-xl shadow-md"
                        />
                    </div>
                </div>

                {/* Card 4: Community Impact */}
                <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-white/10 hover:shadow-xl transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-6 cursor-pointer">
                        <h3 className="text-xl md:text-2xl font-[Rye] tracking-widest font-medium text-white group-hover:text-orange-400 transition-colors duration-300">
                            Community Impact
                        </h3>
                        <span className="text-orange-400 text-xl group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6 items-start h-full">
                        <div className="w-full sm:w-1/2 flex-shrink-0">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&crop=entropy&auto=format"
                                alt="Community Impact"
                                className="w-full h-full object-cover rounded-xl shadow-md"
                            />
                        </div>
                        <div className="w-full sm:w-1/2 flex flex-col justify-center">
                            <h4 className="text-lg md:text-xl font-medium text-white mb-3 font-[Rye] tracking-widest">
                                Sri Sairam Engineering College
                            </h4>
                            <p className="text-gray-300  font-[Poppins] tracking-wider text-base md:text-xl mb-4">
                                Discover cutting-edge technologies and modern development practices that shape the future of web applications.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BentoGrid;