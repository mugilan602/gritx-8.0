import React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

// --- 1. Updated Data for Events ---
const eventsData = [
    {
        id: 1,
        icon: "🎤",
        title: "Tech Summit 2025",
        description: "Join industry leaders for a deep dive into the future of technology.",
        hueA: 340,
        hueB: 10,
        link: "/tech-summit",
    },
    {
        id: 2,
        icon: "🎨",
        title: "Design Forward",
        description: "A creative conference for designers and innovators to share ideas.",
        hueA: 20,
        hueB: 40,
        link: "/design-forward",
    },
    {
        id: 3,
        icon: "🚀",
        title: "Startup Showcase",
        description: "Discover the next generation of startups and network with founders.",
        hueA: 60,
        hueB: 90,
        link: "/startup-showcase",
    },
    {
        id: 4,
        icon: "📈",
        title: "Marketing Week",
        description: "Learn the latest trends in digital marketing and brand strategy.",
        hueA: 80,
        hueB: 120,
        link: "/marketing-week",
    },
];

/**
 * @typedef {Object} Event
 * @property {number} id - Unique identifier for the event
 * @property {string} icon - Event icon emoji
 * @property {string} title - Event title
 * @property {string} description - Event description
 * @property {number} hueA - First color hue value
 * @property {number} hueB - Second color hue value
 */

export default function EventsPage() {
    return (
        <div className="min-h-screen bg-black py-12 px-4">
            <div className="max-w-8xl mx-auto">
                <div className="mb-16">
                    {/* ✅ FIX: Added relative z-10 to make the heading visible */}
                    <h1 className="relative z-10 text-white text-4xl md:text-6xl font-['Rye'] tracking-widest font-medium text-center mb-8">
                        Technical Events
                    </h1>
                    <div style={container}>
                        {eventsData.map((event) => (
                            <Card event={event} key={event.id} />
                        ))}
                    </div>
                </div>

                <div className="mb-16">
                    {/* ✅ FIX: Added relative z-10 to make the heading visible */}
                    <h1 className="relative z-10 text-white text-4xl md:text-6xl font-['Rye'] tracking-widest font-medium text-center mb-8">
                        Non-Technical Events
                    </h1>
                    <div style={container}>
                        {eventsData.map((event) => (
                            <Card event={event} key={event.id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function Card({ event }) {
    const background = `linear-gradient(306deg, ${hue(event.hueA)}, ${hue(event.hueB)})`

    return (
        <motion.div
            style={cardContainer}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8 }}
        >
            <div style={{ ...splash, background }} />
            <motion.div style={card} variants={cardVariants}>
                <div style={cardContent}>
                    <div style={iconContainer}>{event.icon}</div>
                    <h3 style={titleStyle}>{event.title}</h3>
                    <p style={descriptionStyle}>{event.description}</p>
                    <Link to={event.link} style={{ textDecoration: 'none' }}>
                        <motion.button
                            style={buttonStyle}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Learn More
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    )
}

const cardVariants = {
    offscreen: {
        y: 300,
    },
    onscreen: {
        y: 50,
        rotate: -10,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
        },
    },
}

const hue = (h) => `hsl(${h}, 100%, 50%)`

/**
 * ==============   Styles   ================
 */

const container = {
    margin: "60px auto",
    maxWidth: "98%",
    paddingBottom: 100,
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "7rem",
    alignItems: "start",
    "@media (min-width: 768px)": {
        maxWidth: "1200px",
        margin: "100px auto",
    }
}

const cardContainer = {
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingTop: 20,
    marginBottom: 0,
    "@media (min-width: 768px)": {
        marginBottom: -120,
    }
}

const splash = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
}

const card = {
    width: "100%",
    minWidth: 280,
    maxWidth: 280,
    height: "auto",
    minHeight: 400,
    borderRadius: 20,
    background: "rgba(245, 245, 245, 0.95)",
    backdropFilter: "blur(10px)",
    boxShadow:
        "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
    transformOrigin: "10% 60%",
    padding: "1.5rem",
    fontFamily: "sans-serif",
    color: "#333",
    margin: "0 auto",
}

const cardContent = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
}

const iconContainer = {
    fontSize: "3.5rem",
    marginBottom: "1rem",
}

const titleStyle = {
    fontSize: "1.75rem",
    fontWeight: "bold",
    margin: 0,
}

const descriptionStyle = {
    fontSize: "1rem",
    flexGrow: 1, // Pushes the button to the bottom
    lineHeight: 1.5,
}

const buttonStyle = {
    background: "#333",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    marginTop: "1rem",
    padding: "0.75rem 1.5rem",
    borderRadius: "999px",
    fontWeight: "bold",
    cursor: "pointer",
    alignSelf: "flex-start",
    fontSize: "1rem",
}