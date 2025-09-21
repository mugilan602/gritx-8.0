import React from 'react';

/**
 * A single responsive photocard component.
 * @param {{imageUrl: string, name: string}} props - The properties for the photocard.
 * @returns {JSX.Element}
 */
const Photocard = ({ imageUrl, name }) => {
    // Fallback image in case the original fails to load
    const handleImageError = (e) => {
        e.target.src = `https://placehold.co/400x500/cccccc/ffffff?text=Image+Not+Found`;
    };

    return (
        <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <div className="relative">
                <img
                    src={imageUrl}
                    alt={`Photo of ${name}`}
                    className="w-full h-auto object-cover aspect-[4/5]"
                    onError={handleImageError}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-white text-lg font-semibold text-center truncate">
                        {name}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default Photocard;
