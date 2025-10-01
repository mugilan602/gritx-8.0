import AnimatedEventPage from '../components/AnimatedEventPage';

const myCoolEvent = {
    name: "Code Genesis 2025",
    logoUrl: "https://via.placeholder.com/150/FFFFFF/000000/?text=CG",
    description: "Welcome to the ultimate coding showdown of the year! Code Genesis is a 48-hour hackathon designed to challenge developers, designers, and innovators to build groundbreaking solutions for real-world problems. Sharpen your skills, collaborate with brilliant minds, and bring your ideas to life. Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Participants should expect intense sprints, mentorship sessions, and real-world judging criteria that reward usability, performance, and creativity.",
    rounds: [
        {
            id: 1,
            title: "Round 1: Ideation & Prototyping",
            description: "In Round 1 teams will brainstorm, research user needs, and quickly prototype a proof-of-concept. Expect guided mentor check-ins, feasibility reviews, and a short prototype demo at the end of the slot. The emphasis is on clarity of idea, technical feasibility, and a clear value proposition. Teams should prepare a one-page summary and mockups to help judges understand the problem and the proposed solution. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        },
        {
            id: 2,
            title: "Round 2: Development Sprint",
            description: "Round 2 is the core development phase where teams build the product, integrate essential features, and optimize for performance. Participants will be judged on code quality, architecture, UI/UX coherence, and the ability to deliver a minimum viable product within the time limit. Continuous integration, version control, and live demos may be part of the evaluation. Teams are encouraged to focus on a few high-impact features rather than many incomplete ones.",
        },
        {
            id: 3,
            title: "Round 3: Final Pitches & Judging",
            description: "In the final round each team will present their solution to a panel of judges, demonstrate key functionality, and respond to Q&A. Judges will consider originality, technical difficulty, real-world impact, and presentation quality. Winning teams will receive prizes and mentorship opportunities. The presentation should succinctly communicate problem, approach, outcomes, and next steps. Lorem Ipsum was popularised in the 1960s with the release of Letraset sheets.",
        },
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
        { id: 4, name: "Anjali Desai", role: "Marketing & Outreach", imageUrl: "https://via.placeholder.com/150/808080/FFFFFF?text=AD" },
        { id: 5, name: "Anjali Desai", role: "Marketing & Outreach", imageUrl: "https://via.placeholder.com/150/808080/FFFFFF?text=AD" },
        { id: 6, name: "Anjali Desai", role: "Marketing & Outreach", imageUrl: "https://via.placeholder.com/150/808080/FFFFFF?text=AD" },
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