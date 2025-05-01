"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import DemoTabletLayout from "@/components/animations/DemoTabletLayout"; // Import the NEW layout
import { Scene as AppScene } from "@/types"; // Import Scene type
import { SCENES } from "@/data/sceneRegistry"; // Import SCENES if needed for dummy scene
// We might need styles from animations.css if TabletLayout relies on them heavily
import "@/components/animations/animations.css";
import { useRouter } from "next/navigation"; // Import useRouter
import { XMarkIcon } from "@heroicons/react/24/solid"; // Import XMarkIcon

// Interface for chat messages
interface ChatMessage {
    id: number;
    sender: "user" | "assistant";
    text: string;
}

// Dummy scene data for TabletLayout props
const dummyScene: AppScene & { [key: string]: unknown } = {
    scene: SCENES.MORNING_SHIFT, // Use an existing scene ID
    title: "VayyarCare Demo",
    subtitle: "Live Chat",
    // Add any other props TabletLayout might expect from scene
};

export default function DemoPage() {
    const router = useRouter(); // Add router hook
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTypingSuggestion, setIsTypingSuggestion] = useState(false); // State for typewriter effect
    // --- State for send button hint ---
    const [showSendButtonHint, setShowSendButtonHint] = useState(false);
    const [firstSuggestionCompleted, setFirstSuggestionCompleted] =
        useState(false);
    // --- End State for send button hint ---
    const chatAreaRef = useRef<HTMLDivElement>(null); // Ref for the scrollable chat area
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref to clear existing typing animation

    // Scroll chat area to bottom
    useEffect(() => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    }, [messages]);

    // Simulate assistant response (same as before)
    const getAssistantResponse = (userInput: string): string => {
        const lowerInput = userInput.toLowerCase();
        if (lowerInput.includes("fell") || lowerInput.includes("fall")) {
            return "Room 208 had a confirmed fall at 3:18 AM. The resident is okay and resting.";
        } else if (lowerInput.includes("bathroom")) {
            return "Room 115 shows increased bathroom activity (4 visits) in the last 6 hours. No falls detected.";
        } else if (
            lowerInput.includes("how many") ||
            lowerInput.includes("count")
        ) {
            return `Currently monitoring X residents. Y alerts are active, Z critical.`; // Replace X,Y,Z with data if available
        } else if (
            lowerInput.includes("help") ||
            lowerInput.includes("what can i ask")
        ) {
            return "You can ask about recent falls, specific room activity, bathroom usage, or overall resident status.";
        } else {
            return "I can provide summaries on resident activity, falls, and vital signs. How can I help you today?";
        }
    };

    // --- Function to hide hint ---
    const handleHideHint = () => {
        setShowSendButtonHint(false);
    };
    // --- End Function to hide hint ---

    // Handle sending a message
    const handleSendMessage = () => {
        const trimmedInput = inputValue.trim();
        if (!trimmedInput) return;

        const userMessage: ChatMessage = {
            id: Date.now(),
            sender: "user",
            text: trimmedInput,
        };
        setMessages((prev) => [...prev, userMessage]);

        setTimeout(() => {
            const assistantResponse = getAssistantResponse(trimmedInput);
            const assistantMessage: ChatMessage = {
                id: Date.now() + 1,
                sender: "assistant",
                text: assistantResponse,
            };
            setMessages((prev) => [...prev, assistantMessage]);
        }, 800);

        setInputValue("");
        handleHideHint(); // Hide hint when message is sent
    };

    // Handle clicking a suggestion
    const handleSuggestionClick = (questionText: string) => {
        if (isTypingSuggestion) return;
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

        setShowSendButtonHint(false); // Hide hint if a new suggestion is clicked during animation
        setIsTypingSuggestion(true);
        setInputValue("");

        let index = 0;
        const typeCharacter = () => {
            if (index < questionText.length) {
                const currentText = questionText.substring(0, index + 1);
                setInputValue(currentText);
                index++;
                typingTimeoutRef.current = setTimeout(typeCharacter, 50);
            } else {
                setIsTypingSuggestion(false);
                typingTimeoutRef.current = null;
                if (!firstSuggestionCompleted) {
                    setShowSendButtonHint(true);
                    setFirstSuggestionCompleted(true);
                }
            }
        };
        typeCharacter();
    };

    return (
        // Main container: Always flex-col, center items horizontally, align to top
        <div className="relative flex flex-col items-center justify-start min-h-screen bg-white p-4 pt-16">
            {/* Close Button */}
            <button
                onClick={() => router.back()}
                className="absolute top-6 right-6 z-[110] flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition cursor-pointer"
                aria-label="Close demo"
            >
                <XMarkIcon className="h-6 w-6" />
            </button>

            {/* Notice Text Area REMOVED */}
            {/* 
            <div className="text-center lg:text-left text-base text-gray-700 mb-6 lg:mb-0 lg:max-w-xs">
                <p className="font-semibold mb-2">Try the VayyarCare Demo!</p>
                <p>This demo uses a mock patient database.</p>
                <p className="mt-2">You can ask anything — try:</p>
                <ul className="list-disc list-inside ml-4 mt-1 text-sm text-gray-600">
                    <li>"Who fell last night?"</li>
                    <li>"How many are in the bathroom?"</li>
                    <li>"What happened in room 115?"</li>
                 </ul>
            </div> 
            */}

            {/* Tablet Container - Centered horizontally, responsive height */}
            <div className="relative w-[375px] h-[85vh] max-h-[750px] flex-shrink-0">
                <DemoTabletLayout
                    scene={dummyScene}
                    showMetrics={true}
                    scrollProgress={0}
                    queryCompleteThreshold={102}
                    responseStartThreshold={103}
                    transitionStartThreshold={104}
                    contentTransitionThreshold={105}
                    inputValue={inputValue}
                    onInputChange={(e) => {
                        setInputValue(e.target.value);
                        handleHideHint(); // Hide hint on manual input change
                    }}
                    onSend={handleSendMessage}
                    inputPlaceholder="Ask VayyarCare..."
                    showSendButtonHint={showSendButtonHint}
                    onHideHint={handleHideHint} // Pass the hide handler
                >
                    <div
                        ref={chatAreaRef}
                        className="flex-grow overflow-y-auto p-3 space-y-3"
                    >
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`flex ${
                                    msg.sender === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div
                                    className={`max-w-[75%] p-2 px-3 rounded-lg text-sm ${
                                        msg.sender === "user"
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 text-gray-800"
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </DemoTabletLayout>

                {/* Example Questions - Absolutely Positioned Around Tablet */}
                {/* Parent container for staggering */}
                <motion.div
                    className="absolute inset-0 pointer-events-none" // Position wrapper over tablet area, ignore pointer events
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.3, // Stagger delay between children
                                delayChildren: 0.5, // Optional delay before the first child starts
                            },
                        },
                    }}
                    initial="hidden"
                    animate="show"
                >
                    {/* Individual question animations - Phased Pulse */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 15, rotate: -6 },
                            show: {
                                opacity: 1,
                                y: 0,
                                rotate: -6,
                                transition: { duration: 0.4, ease: "easeOut" },
                            },
                        }}
                        className="absolute top-[5%] -left-[400px] transform bg-gray-100/90 text-gray-700 text-base px-4 py-2 rounded-full shadow-md pointer-events-auto cursor-pointer"
                        style={{
                            animation: "subtlePulse 2.5s infinite ease-in-out",
                            animationDelay: "0s",
                        }}
                        onClick={() =>
                            handleSuggestionClick("Who fell last night?")
                        }
                    >
                        Who fell last night?
                    </motion.div>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 15, rotate: 3 },
                            show: {
                                opacity: 1,
                                y: 0,
                                rotate: 3,
                                transition: { duration: 0.4, ease: "easeOut" },
                            },
                        }}
                        className="absolute top-[20%] -right-[420px] transform bg-blue-50/90 text-blue-800 text-base px-4 py-2 rounded-full shadow-md pointer-events-auto cursor-pointer"
                        style={{
                            animation: "subtlePulse 2.5s infinite ease-in-out",
                            animationDelay: "0.3s",
                        }}
                        onClick={() =>
                            handleSuggestionClick("What happened in room 115?")
                        }
                    >
                        What happened in room 115?
                    </motion.div>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 15, rotate: 4 },
                            show: {
                                opacity: 1,
                                y: 0,
                                rotate: 4,
                                transition: { duration: 0.4, ease: "easeOut" },
                            },
                        }}
                        className="absolute bottom-[35%] -left-[380px] transform bg-gray-100/90 text-gray-700 text-base px-4 py-2 rounded-full shadow-md pointer-events-auto cursor-pointer"
                        style={{
                            animation: "subtlePulse 2.5s infinite ease-in-out",
                            animationDelay: "0.6s",
                        }}
                        onClick={() =>
                            handleSuggestionClick(
                                "How many are in the bathroom?"
                            )
                        }
                    >
                        How many are in the bathroom?
                    </motion.div>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 15, rotate: -2 },
                            show: {
                                opacity: 1,
                                y: 0,
                                rotate: -2,
                                transition: { duration: 0.4, ease: "easeOut" },
                            },
                        }}
                        className="absolute bottom-[5%] -right-[440px] transform bg-blue-50/90 text-blue-800 text-base px-4 py-2 rounded-full shadow-md pointer-events-auto cursor-pointer"
                        style={{
                            animation: "subtlePulse 2.5s infinite ease-in-out",
                            animationDelay: "0.9s",
                        }}
                        onClick={() =>
                            handleSuggestionClick(
                                "Show me yesterday&apos;s summary"
                            )
                        }
                    >
                        Show me yesterday&apos;s summary
                    </motion.div>
                    {/* --- More Questions - Increased spacing AGAIN --- */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 15, rotate: 5 },
                            show: {
                                opacity: 1,
                                y: 0,
                                rotate: 5,
                                transition: { duration: 0.4, ease: "easeOut" },
                            },
                        }}
                        className="absolute top-[45%] -left-[420px] transform bg-gray-100/90 text-gray-700 text-base px-4 py-2 rounded-full shadow-md pointer-events-auto cursor-pointer"
                        style={{
                            animation: "subtlePulse 2.5s infinite ease-in-out",
                            animationDelay: "1.2s",
                        }}
                        onClick={() =>
                            handleSuggestionClick("Is anyone showing distress?")
                        }
                    >
                        Is anyone showing distress?
                    </motion.div>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 15, rotate: -4 },
                            show: {
                                opacity: 1,
                                y: 0,
                                rotate: -4,
                                transition: { duration: 0.4, ease: "easeOut" },
                            },
                        }}
                        className="absolute top-[65%] -right-[400px] transform bg-blue-50/90 text-blue-800 text-base px-4 py-2 rounded-full shadow-md pointer-events-auto cursor-pointer"
                        style={{
                            animation: "subtlePulse 2.5s infinite ease-in-out",
                            animationDelay: "1.5s",
                        }}
                        onClick={() =>
                            handleSuggestionClick("Summarize the night shift.")
                        }
                    >
                        Summarize the night shift.
                    </motion.div>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 15, rotate: -8 },
                            show: {
                                opacity: 1,
                                y: 0,
                                rotate: -8,
                                transition: { duration: 0.4, ease: "easeOut" },
                            },
                        }}
                        className="absolute bottom-[55%] -left-[390px] transform bg-gray-100/90 text-gray-700 text-base px-4 py-2 rounded-full shadow-md pointer-events-auto cursor-pointer"
                        style={{
                            animation: "subtlePulse 2.5s infinite ease-in-out",
                            animationDelay: "1.8s",
                        }}
                        onClick={() =>
                            handleSuggestionClick("Check on room 305.")
                        }
                    >
                        Check on room 305.
                    </motion.div>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 15, rotate: 6 },
                            show: {
                                opacity: 1,
                                y: 0,
                                rotate: 6,
                                transition: { duration: 0.4, ease: "easeOut" },
                            },
                        }}
                        className="absolute bottom-[20%] -right-[460px] transform bg-blue-50/90 text-blue-800 text-base px-4 py-2 rounded-full shadow-md pointer-events-auto cursor-pointer"
                        style={{
                            animation: "subtlePulse 2.5s infinite ease-in-out",
                            animationDelay: "2.1s",
                        }}
                        onClick={() =>
                            handleSuggestionClick("Any mobility changes today?")
                        }
                    >
                        Any mobility changes today?
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
