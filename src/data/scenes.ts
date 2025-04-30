import { SCENES } from "./sceneRegistry";

export const scenes = [
    {
        scene: SCENES.MORNING_SHIFT,
        title: "Morning shift",
        description: "Automated shift summary",
        showUpAt: 33,
        disappearAt: 71,
        content: [
            "Room 302: Resident shows signs of unsteady walking",
            "Room 214: Bathroom visits increased 40% overnight",
            "Room 117: Sleep quality decreased to 68%",
        ],
    },
    {
        scene: SCENES.FALL_EVENT,
        title: "Fall event",
        description: "Personal assistant, retrieving data in seconds!",
        showUpAt: 0,
        disappearAt: 100,
        percentageText: {
            70: {
                text: "Suddenly she receives a fall alert.",
            },
            82: {
                text: "And she solves it!",
            },
        },
    },
    {
        scene: SCENES.DOCUMENT_EVENT,
        title: "Automated documentation",
        description:
            "Instead of writing a report herself, Alice askss VayyarCare document the event for her.",
        showUpAt: 0,
        disappearAt: 100,
    },
    {
        scene: SCENES.VP_CLINICAL,
        title: "Monthly review with VP Clicnal",
        description:
            "Alice meets with the VP Clinical to discuss the past month.",
        showUpAt: 0,
        disappearAt: 100,
    },
    {
        scene: SCENES.VP_FAMILY,
        title: "Talk with family",
        description:
            "The VP Clinical meets with Toni's family and explains why it is better for Toni to get extra care.",
        showUpAt: 0,
        disappearAt: 100,
    },
];
