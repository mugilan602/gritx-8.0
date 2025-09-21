import React from 'react';
import Photocard from './PhotoCard.jsx'; // Assuming Photocard.jsx is in the same directory

// Data for the photocards
const teamMembers = [
    {
        name: 'Alex Johnson',
        imageUrl: 'https://placehold.co/400x500/3498db/ffffff?text=Alex'
    },
    {
        name: 'Maria Garcia',
        imageUrl: 'https://placehold.co/400x500/e74c3c/ffffff?text=Maria'
    },
    {
        name: 'James Smith',
        imageUrl: 'https://placehold.co/400x500/2ecc71/ffffff?text=James'
    },
    {
        name: 'Priya Patel',
        imageUrl: 'https://placehold.co/400x500/f1c40f/ffffff?text=Priya'
    },
    {
        name: 'Chen Wang',
        imageUrl: 'https://placehold.co/400x500/9b59b6/ffffff?text=Chen'
    },

];

/**
 * The main application component that renders a page of photocards.
 * @returns {JSX.Element}
 */
export default function MainLeads() {
    return (
        // Using a div to simulate the body tag with background colors
        <div className=" text-gray-800 dark:text-gray-200" style={{ fontFamily: "'Inter', sans-serif" }}>
            <div className="container mx-auto px-4 py-12">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Event Co-ordinators</h1>
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
