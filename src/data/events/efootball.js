// E-Football Event Details
export const eFootballEventData = {
    name: "E-Football",
    logoUrl: "/logo8.png",
    description: "Get ready to take your football skills from the field to the screen! Our college is hosting an eFootball tournament filled with intense matches, creative moves, and loads of fun. Players will compete in 1v1 knockout battles, striving to reach the top and prove their mastery on the virtual pitch. Whether you’re a seasoned player or just enjoy the game for fun, this is your chance to shine and win exciting prizes along with ultimate bragging rights. Grab your controller, prepare your skills, and join us for a day of thrilling matchups and non-stop action as teams compete for the title of campus champion.",
    rounds: [
        {
            id: 1,
            title: "Round 1",
            description: "The event begins with an online round where participants form groups and compete by playing the game. Teams must submit proof of their performance, which will be used to evaluate their progress. Based on the submissions, winners are shortlisted to advance to the next round.",
        },
        {
            id: 2,
            title: "Round 2",
            description: "The second round is conducted offline at the college venue. Shortlisted teams from Round 1 compete in person, following the same gameplay format. Their performance in this round determines which teams advance to the final round.",
        },
        {
            id: 3,
            title: "Round 3",
            description: "The third and final round is also held offline. Teams compete face-to-face to showcase their skills and strategy. The results of this round decide the overall winners of the tournament.",
        },
    ],
    details: {
        teamSize: "Individual Participation",
        prizes: {
            first: "₹1000",
            second: "₹750",
            third: "₹500",
        },
        entryFee: "₹50",
    },
    coordinators: [
        { id: 1, name: "Madhan", imageUrl: "/coordinators/madhan.jpg" },
        { id: 2, name: "Siddharth", imageUrl: "/coordinators/sidharrth.jpg" },
        { id: 3, name: "Saran", imageUrl: "/coordinators/saran.jpg" },
        { id: 4, name: "Sharmi", imageUrl: "/coordinators/sharmi.jpg" },
    ],
    gform: "https://forms.gle/egwG8Xb91szbSq9M8"
};