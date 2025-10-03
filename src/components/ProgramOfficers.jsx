import React from 'react';
import Photocard from './PhotoCard.jsx'; // Assuming Photocard.jsx is in the same directory

// Data for the photocards
const teamMembers = [
    {
        name: 'Dr. G. Sathish kumar',
        imageUrl: '/po/1.png'
    },
    {
        name: 'Dr. S.K. Uma Maheswaran',
        imageUrl: '/po/2.png'
    },
    {
        name: 'Mrs. M. Vanitha',
        imageUrl: '/po/3.png'
    },
    {
        name: 'Dr. S. Dinesh',
        imageUrl: '/po/4.png'
    },
    {
        name: 'Mr. K. Mohan Raj',
        imageUrl: '/po/5.png'
    },
    {
        name: 'Dr. K. Baranidharan',
        imageUrl: '/po/6.jpg'
    },
    {
        name: 'Dr. R. Avudaniyaki',
        imageUrl: '/po/7.jpg'
    },
    {
        name: 'Dr. D. Roopa',
        imageUrl: '/po/9.jpg'
    },

];

/**
 * The main application component that renders a page of photocards.
 * @returns {JSX.Element}
 */
export default function ProgramOfficers() {
    return (
        // Using a div to simulate the body tag with background colors
        <div className=" text-gray-800 dark:text-gray-200">
            <div className="container mx-auto px-4 py-12">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl f font-[rye] tracking-wider font-medium text-gray-900 dark:text-white">Program Officers</h1>
                </header>

                {/* Photocards Grid */}
                <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                    {teamMembers.map((member, index) => (
                        <Photocard
                            key={index}
                            name={member.name}
                            imageUrl={member.imageUrl}
                        />
                    ))}
                </main>
            </div>
        </div>
    );
}
