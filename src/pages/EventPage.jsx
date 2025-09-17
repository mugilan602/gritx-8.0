import AnimatedEventPage from '../components/AnimatedEventPage';

const myCoolEvent = {
    name: "Code Genesis 2025",
    logoUrl: "https://via.placeholder.com/150/FFFFFF/000000/?text=CG",
    description: "Welcome to the ultimate coding showdown of the year! Code Genesis is a 48-hour hackathon designed to challenge developers, designers, and innovators to build groundbreaking solutions for real-world problems. Sharpen your skills, collaborate with brilliant minds, and bring your ideas to life.",
    rounds: [
        { id: 1, title: "Round 1: Ideation & Prototyping", description: "Teams will brainstorm ideas..." },
        { id: 2, title: "Round 2: Development Sprint", description: "This is the core coding phase..." },
        { id: 3, title: "Round 3: Final Pitches & Judging", description: "Each team will present their project..." },
    ],
    details: {
        teamSize: "2-4 Members",
        prizes: {
            first: "₹50,000 Cash Prize + Swag Kits",
            second: "₹25,000 Cash Prize + Vouchers",
            third: "₹10,000 Cash Prize",
        },
    },
    coordinators: [
        { id: 1, name: "Priya Sharma", role: "Lead Organizer", imageUrl: "https://via.placeholder.com/150/808080/FFFFFF?text=PS" },
        { id: 2, name: "Rohan Kumar", role: "Technical Head", imageUrl: "https://via.placeholder.com/150/808080/FFFFFF?text=RK" },
        { id: 3, name: "Anjali Desai", role: "Marketing & Outreach", imageUrl: "https://via.placeholder.com/150/808080/FFFFFF?text=AD" },
    ],
};

function EventPage() {
    return (
        <div>
            <AnimatedEventPage eventData={myCoolEvent} />
        </div>
    );
}

export default EventPage;