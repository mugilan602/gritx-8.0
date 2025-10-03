// The Debate Saga Event Details
export const theDebateSagaEventData = {
    name: "The Debate Saga",
    logoUrl: "/logo13.png",
    description: "This debate event challenges teams to think quickly, communicate effectively, and present balanced arguments. Participants engage in structured rounds where topics are assigned, preparation time is given, and judges evaluate based on clarity, reasoning, and fairness. The event is conducted offline.",
    rounds: [
        {
            id: 1,
            title: "Round 1",
            description: "In Round 1, teams participate in an offline mini-debate where a topic is selected through a “Balloon Pop.” One team member becomes the judge, while the other two argue for and against the topic. Participants get 5 minutes to prepare their points, and then present their arguments in an 8-minute debate round.",
        },
    ],
    details: {
        teamSize: "3 Members",
        prizes: {
            first: "₹1000",
            second: "₹750",
            third: "₹500",
        },
    },
    coordinators: [
        { id: 1, name: "Thamaraiselvan V", imageUrl: "/coordinators/thamaraiselvan.jpg" },
        { id: 2, name: "Parthipan A", imageUrl: "/coordinators/parthipan.jpg" },
        { id: 3, name: "Pooja Sri", imageUrl: "/coordinators/pooja.jpg" },
    ],

    gform: "https://forms.gle/s6gqu7Xf8Y4Keugy6"
};