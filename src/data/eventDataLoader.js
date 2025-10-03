// Import all event data
import { projectrixEventData } from './events/projectrix.js';
import { code2cosmosEventData } from './events/code2cosmos.js';
import { bugBlazeEventData } from './events/bugBlaze.js';
import { rollAndRuleEventData } from './events/rollandrule.js';
import { designDashEventData } from './events/designdash.js';
import { webVibeEventData } from './events/webvibe.js';
import { miniHackathonEventData } from './events/minihackathon.js';
import { paperPresentationEventData } from './events/paperpresentation.js';
import { script2screenEventData } from './events/script2screen.js';
import { huntxcapeEventData } from './events/huntxcape.js';
import { jockeyJunctionEventData } from './events/jockeyjunction.js';
import { sportseraEventData } from './events/sportsera.js';
import { eFootballEventData } from './events/efootball.js';
import { frozenFramesEventData } from './events/frozenframes.js';
import { theDebateSagaEventData } from './events/debatesaga.js';
import { cinesparkEventData } from './events/cinespark.js';
import { theReelShowdownEventData } from './events/reelshowndown.js';
import { campusAmbassadorEventData } from './events/campusambassador.js';
import { cinimaxEventData } from './events/cinimax.js';

// Event data mapping - add more events as you create their data files
export const eventDataMap = {
    'projectrix': projectrixEventData,
    'code2cosmos': code2cosmosEventData,
    'bug-blaze': bugBlazeEventData,
    // Add more events here as you create their data files
    'roll-and-rule': rollAndRuleEventData,
    'script2screen': script2screenEventData,
    // Add default template for other events
    'huntxcape': huntxcapeEventData,
    'jockey-junction': jockeyJunctionEventData,
    'sportsera': sportseraEventData,
    'e-football': eFootballEventData,
    'cinimax': cinimaxEventData,
    'campus-ambassador': campusAmbassadorEventData,
    'frozen-frames': frozenFramesEventData,
    'design-dash': designDashEventData,
    'the-debate-saga': theDebateSagaEventData,
    'web-vibe': webVibeEventData,
    'the-reel-showdown': theReelShowdownEventData,
    'mini-hackathon': miniHackathonEventData,
    'cine-spark': cinesparkEventData,
    'paper-presentation': paperPresentationEventData,
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