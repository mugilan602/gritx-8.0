// Import all event data
import { projectrixEventData } from './events/projectrix.js';
import { code2cosmosEventData } from './events/code2cosmos.js';
import { bugBlazeEventData } from './events/bugBlaze.js';

// Event data mapping - add more events as you create their data files
export const eventDataMap = {
    'projectrix': projectrixEventData,
    'code2cosmos': code2cosmosEventData,
    'bug-blaze': bugBlazeEventData,
    // Add more events here as you create their data files
    'roll-and-rule': {
        name: "Roll and Rule",
        logoUrl: "/logo3.png",
        description: "Roll and Rule is a board game challenge that blends puzzles, tasks, and strategy into every dice throw. Compete with your team, face unexpected twists, and prove your skills to rule the board.",
        rounds: [
            { id: 1, title: "Round 1: Dice & Strategy", description: "Teams compete in strategic board game challenges with dice-based mechanics." },
            { id: 2, title: "Round 2: Puzzle Master", description: "Complex puzzles and brain teasers that test logical thinking and teamwork." },
            { id: 3, title: "Round 3: Rule the Board", description: "Final showdown combining strategy, luck, and quick decision making." },
        ],
        details: {
            teamSize: "3-5 Members",
            prizes: {
                first: "₹15,000 Cash Prize + Board Game Collection",
                second: "₹8,000 Cash Prize + Strategy Games",
                third: "₹4,000 Cash Prize + Gaming Vouchers",
            },
        },
        coordinators: [
            { id: 1, name: "Game Master Gary", role: "Board Game Expert", imageUrl: "https://via.placeholder.com/150/059669/FFFFFF?text=GG" },
            { id: 2, name: "Strategy Queen Sara", role: "Event Lead", imageUrl: "https://via.placeholder.com/150/DC2626/FFFFFF?text=SQ" },
        ],
        gform: "https://forms.gle/roll-and-rule-registration"
    },
    'script2screen': {
        name: "Script2Screen",
        logoUrl: "/logo4.png",
        description: "Script2Screen is a celebration of storytelling across multiple mediums including TV shows, Web series, books, and advertisements. Unleash your creativity, explore narratives, and showcase the art of bringing stories to life.",
        rounds: [
            { id: 1, title: "Round 1: Script Writing", description: "Create compelling scripts for various media formats within given themes and constraints." },
            { id: 2, title: "Round 2: Story Adaptation", description: "Transform existing stories into different media formats - from book to screen, etc." },
            { id: 3, title: "Round 3: Final Production", description: "Produce a complete short piece showcasing your storytelling skills across chosen medium." },
        ],
        details: {
            teamSize: "2-6 Members",
            prizes: {
                first: "₹22,000 Cash Prize + Film Equipment",
                second: "₹12,000 Cash Prize + Editing Software License",
                third: "₹6,000 Cash Prize + Creative Writing Books",
            },
        },
        coordinators: [
            { id: 1, name: "Director Dev", role: "Film & Media Head", imageUrl: "https://via.placeholder.com/150/7C2D12/FFFFFF?text=DD" },
            { id: 2, name: "Script Sage Simran", role: "Creative Lead", imageUrl: "https://via.placeholder.com/150/4F46E5/FFFFFF?text=SS" },
        ],
        gform: "https://forms.gle/script2screen-registration"
    },
    // Add default template for other events
    'huntxcape': getDefaultEventData('HuntXcape', "/logo5.png", "HuntXcape is an adventure-driven challenge filled with riddles, puzzles, and escapes. Teams must collaborate, solve clues, and move through thrilling obstacles to reach the end of the journey."),
    'jockey-junction': getDefaultEventData('Jockey Junction', "/logo6.png", "Jockey Junction is the stage to showcase your voice, creativity, and presence. Test your quick wit, engage the crowd with dialogue and expression, and prove you have what it takes to hold the mic."),
    'sportsera': getDefaultEventData('Sportsera', "/logo7.png", "Sportsera is a team-based competition combining knowledge, strength, and strategy. With dynamic tasks and challenges, it creates an exciting mix of sports, memory, and teamwork for all participants."),
    'e-football': getDefaultEventData('E-football', "/logo8.png", "E-football is a competitive knockout tournament where players are paired randomly into teams. Advance by winning rounds, test your skills, and enjoy an unpredictable contest filled with new connections."),
    'cinimax': getDefaultEventData('Cinimax', "/logo9.png", "CiniMax is an event that celebrates cinema with quizzes, songs, and iconic moments. From movie trivia to timeless scenes, it tests your love for films while recreating the magic of the big screen."),
    'campus-ambassador': getDefaultEventData('Campus Ambassador', "/logo10.png", "Campus Ambassador is a leadership initiative where students represent GritX 8.0 in their institutions. Drive promotions, build networks, and inspire peers while gaining recognition and experience."),
    'frozen-frames': getDefaultEventData('Frozen Frames', "/logo11.png", "Frozen Frames is a photography contest that captures creativity through unique perspectives. Showcase moments that reflect nature, emotions, and stories, and let your vision speak through the power of original frames."),
    'design-dash': getDefaultEventData('Design Dash', "/logo12.png", "Design Dash is a Figma challenge where participants craft app or website interfaces on a surprise theme. Showcase originality, bring fresh ideas to life, and prove your creative design skills."),
    'the-debate-saga': getDefaultEventData('The Debate Saga', "/logo13.png", "The Debate Saga is a competition where balloons decide your topics and teams face off in sharp debates. Quick thinking, strong arguments, and fair judging shape the path to victory."),
    'web-vibe': getDefaultEventData('Web Vibe', "/logo14.png", "Web Vibe is a website-building contest inspired by the UN's SDGs. In just 2.5 hours, teams design purposeful, functional sites that combine technology with meaningful impact."),
    'the-reel-showdown': getDefaultEventData('The Reel Showdown', "/logo16.png", "The Reel Showdown is a stage for creative expression through reels, memes, and acts. Perform, dub, and entertain with scenes that bring fun and originality to life."),
    'mini-hackathon': getDefaultEventData('Mini Hackathon', "/logo17.png", "Mini Hackathon is a four-hour challenge where teams design real-world solutions. Build prototypes, pitch your ideas, and showcase innovation that solves meaningful problems."),
    'cine-spark': getDefaultEventData('CineSpark', "/logo18.png", "Cine Spark is a short film event for impactful stories on sustainability, equality, and empowerment. Share your vision, use cinema as a tool for change, and inspire audiences with creativity."),
    'paper-presentation': getDefaultEventData('Paper Presentation', "/logo19.png", "Paper Presentation is a platform for teams to present research or project papers on social service. Selected abstracts are published with ISBN recognition, honoring impactful ideas."),
};

// Helper function to generate default event data structure
function getDefaultEventData(name, logoUrl, description) {
    return {
        name,
        logoUrl,
        description: description + " This exciting competition brings together talented participants to showcase their skills, creativity, and innovation in this challenging and rewarding event experience.",
        rounds: [
            {
                id: 1,
                title: "Round 1: Initial Challenge",
                description: "The first round introduces participants to the event format with foundational challenges that test basic skills and understanding of the competition requirements.",
            },
            {
                id: 2,
                title: "Round 2: Advanced Competition",
                description: "The second round elevates the difficulty with more complex challenges requiring deeper knowledge, strategic thinking, and collaborative problem-solving skills.",
            },
            {
                id: 3,
                title: "Round 3: Final Showdown",
                description: "The ultimate round where top performers compete for victory, demonstrating mastery of skills and innovative approaches to achieve excellence in the final challenge.",
            },
        ],
        details: {
            teamSize: "2-4 Members",
            prizes: {
                first: "₹15,000 Cash Prize + Winner's Trophy + Certificates",
                second: "₹8,000 Cash Prize + Runner-up Trophy + Certificates",
                third: "₹5,000 Cash Prize + Participation Trophy + Certificates",
            },
        },
        coordinators: [
            { id: 1, name: "Event Coordinator", role: "Lead Organizer", imageUrl: "https://via.placeholder.com/150/4F46E5/FFFFFF?text=EC" },
            { id: 2, name: "Technical Head", role: "Technical Coordinator", imageUrl: "https://via.placeholder.com/150/DC2626/FFFFFF?text=TH" },
            { id: 3, name: "Student Lead", role: "Event Manager", imageUrl: "https://via.placeholder.com/150/059669/FFFFFF?text=SL" },
        ],
        gform: `https://forms.gle/${name.toLowerCase().replace(/\s+/g, '-')}-registration`
    };
}

// Function to get event data by slug
export const getEventDataBySlug = (slug) => {
    return eventDataMap[slug] || null;
};