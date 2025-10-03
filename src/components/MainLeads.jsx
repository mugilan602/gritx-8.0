import React from 'react';
import Photocard from './PhotoCard.jsx'; // Assuming Photocard.jsx is in the same directory

// Data for the photocards
const teamMembers = [
    {
        name: 'Sana Fathima S ',
        imageUrl: '/mainleads/1.jpg'
    },
    {
        name: 'Varsha B',
        imageUrl: '/mainleads/2.jpg'
    },
    {
        name: 'Eswar S',
        imageUrl: '/mainleads/3.jpg'
    },
    {
        name: 'Raghulnath P L',
        imageUrl: '/mainleads/4.jpeg'
    },
    {
        name: 'Swetha P',
        imageUrl: '/mainleads/5.jpg'
    },
    {
        name: 'Vijay Athithya S V',
        imageUrl: '/mainleads/6.jpg'
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
                    <h1 className="text-4xl md:text-5xl  font-[rye] tracking-wider font-medium text-gray-900 dark:text-white">Event Co-ordinators</h1>
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
