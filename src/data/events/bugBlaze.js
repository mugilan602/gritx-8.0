// Bug Blaze Event Details  
export const bugBlazeEventData = {
    name: "Bug Blaze",
    logoUrl: "/logo15.png",
    description: "Bug Blaze is a coding challenge with three rounds of debugging and problem-solving. Test your logic, prove your coding mastery, and innovate under pressure. This intense competition challenges programmers to identify, analyze, and fix complex bugs while developing efficient solutions under time constraints.",
    rounds: [
        {
            id: 1,
            title: "Round 1: Debug Hunt",
            description: "Participants are given buggy code snippets across multiple programming languages. Identify syntax errors, logical bugs, and runtime issues within a time limit. This round tests fundamental debugging skills and attention to detail across various coding scenarios.",
        },
        {
            id: 2,
            title: "Round 2: System Diagnosis",
            description: "Teams work with larger codebases containing multiple interconnected bugs. Debug complex applications with memory leaks, performance issues, and integration problems. Requires systematic debugging approach and collaborative problem-solving skills.",
        },
        {
            id: 3,
            title: "Round 3: Code Optimization Challenge",
            description: "Final round combines debugging with code optimization. Fix critical bugs while improving code performance, readability, and maintainability. Teams present their debugging methodology and optimization strategies to expert judges.",
        },
    ],
    details: {
        teamSize: "1-2 Members",
        prizes: {
            first: "₹20,000 Cash Prize + Professional Debugging Tools License",
            second: "₹12,000 Cash Prize + Programming Books Bundle",
            third: "₹6,000 Cash Prize + Coding Platform Subscriptions",
        },
    },
    coordinators: [
        { id: 1, name: "Debug Master Arjun", role: "Senior Developer", imageUrl: "https://via.placeholder.com/150/DC2626/FFFFFF?text=DA" },
        { id: 2, name: "Code Ninja Shreya", role: "QA Lead", imageUrl: "https://via.placeholder.com/150/059669/FFFFFF?text=CS" },
        { id: 3, name: "Logic Lord Kiran", role: "Systems Architect", imageUrl: "https://via.placeholder.com/150/7C2D12/FFFFFF?text=LK" },
        { id: 4, name: "Error Eliminator Eve", role: "Event Coordinator", imageUrl: "https://via.placeholder.com/150/4F46E5/FFFFFF?text=EE" },
    ],
    gform: "https://forms.gle/bug-blaze-registration"
};