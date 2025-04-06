import { SCENES } from "./sceneRegistry";

export const scenes = [
    {
        scene: SCENES.MORNING_SHIFT,
        description:
            "Nurse Alice just got to her morning shift. Upon entering her desk she picks her phone and starts talking with VayyarCare.",
        calloutDisplayPercentage: "80",
        content: [
            "Room 302: Resident shows signs of unsteady walking",
            "Room 214: Bathroom visits increased 40% overnight",
            "Room 117: Sleep quality decreased to 68%",
        ],
    },
    {
        scene: SCENES.FALL_CHART,
        description: "During her morning walk, Alice checks John's fall chart.",
        extraDescription: {
            70: {
                text: "Suddenly she receives a fall alert.",
            },
            82: {
                text: "And she solves it!"
            }
        },
    },
    {
        scene: SCENES.DOCUMENT_EVENT,
        description: "Instead of writing a report herself, Alice askss VayyarCare document the event for her.",
        calloutDisplayPercentage: "80",
    },
    {
        scene: SCENES.VC_CLINICAL,
        description: "Alice meets with the VP Clinical to discuss the past month.",
    },
    {
        scene: SCENES.VP_FAMILY,
        description: "The VP Clinical meets with Toni's family and explains why it is better for Toni to get extra care.",
    },
];
