import React, { useState, useEffect } from "react";
import TypedText from "./TypedText";
import AnimatedMetric from "./AnimatedMetric";
import TypingIndicator from "./TypingIndicator";
import FadeInList from "./FadeInList";
import TabletLayout from "./TabletLayout";
import "./animations.css";

// Define the Vayyar blue color as a constant for reuse
const VAYYAR_BLUE = "rgba(5, 170, 233, 1)";

const AnimatedTablet1 = ({ scrollProgress = 0, scene }) => {
    // Animation state based on scroll position
    const [animationState, setAnimationState] = useState({
        showEmptyTablet: false,
        showTypingInInput: false, // Alice typing in the input field
        showUserMessage: false, // User message bubble appears
        showBotTypingIndicator: false,
        showBotGreeting: false,
        showMetricsAnimation: false,
        metricsAnimationComplete: false,
        showSummaryTitle: false,
        showSummaryItems: false,
        showActionButton: false,
        showActionButtonPulse: false,
        showSecondTypingInInput: false, // Second query typing
        showSecondUserMessage: false, // Second user message appears
        inputValue: "", // Track the input text as it's "typed"
        secondInputValue: "", // Track the second input text as it's "typed"
    });

    // Mock data
    const userMessage = "Show me yesterday's summary";
    const botGreeting = "Good morning Alice! Here's your shift summary.";
    const secondUserMessage =
        "Give me a breakdown of Joe's hidden falls in the past month?";
    const summaryItems = scene.content || [];

    // Update animation state based on scroll progress
    useEffect(() => {
        // Calculate how much of the message to show in the input as typing progress
        const inputProgress = Math.min(
            1,
            Math.max(0, (scrollProgress - 10) / 15)
        );
        const inputValue = userMessage.substring(
            0,
            Math.floor(inputProgress * userMessage.length)
        );

        // Calculate the second input typing progress with a much longer pause
        // Adding a pause between 75-90% scroll progress where nothing happens
        const secondInputProgress = Math.min(
            1,
            Math.max(0, (scrollProgress - 90) / 8)
        );
        const secondInputValue = secondUserMessage.substring(
            0,
            Math.floor(secondInputProgress * secondUserMessage.length)
        );

        setAnimationState({
            showEmptyTablet: scrollProgress >= 0,
            showTypingInInput: scrollProgress >= 10 && scrollProgress < 25,
            showUserMessage: scrollProgress >= 25,
            showBotTypingIndicator: scrollProgress >= 25 && scrollProgress < 35,
            showBotGreeting: scrollProgress >= 35,
            showMetricsAnimation: scrollProgress >= 40,
            metricsAnimationComplete: scrollProgress >= 55,
            showSummaryTitle: scrollProgress >= 60,
            showSummaryItems: scrollProgress >= 65,
            showActionButton: false, // Disable original action button
            showActionButtonPulse: false, // Disable original action button pulse
            // Add a much longer pause between 75-90% scroll before starting second query
            showSecondTypingInInput:
                scrollProgress >= 90 && scrollProgress < 98,
            showSecondUserMessage: scrollProgress >= 98,
            inputValue: inputValue,
            secondInputValue: secondInputValue,
        });
    }, [scrollProgress]);

    // Render the summary item with appropriate styling
    const renderSummaryItem = (item, index) => (
        <div className="animated-tablet-summary-item">
            <span className="animated-tablet-summary-item-bullet">•</span>
            {item}
        </div>
    );

    return (
        <TabletLayout
            showMetrics={true}
            time="9:41 AM"
            showChatInput={true}
            inputValue={
                animationState.showSecondTypingInInput
                    ? animationState.secondInputValue
                    : animationState.showTypingInInput
                    ? animationState.inputValue
                    : ""
            }
        >
            {/* Chat Messages */}
            {/* User Message - Right aligned bubble */}
            {animationState.showUserMessage && (
                <div className="animated-tablet-user-message">
                    <div className="animated-tablet-user-message-text">
                        {userMessage}
                    </div>
                    <div className="animated-tablet-user-message-timestamp">
                        9:41 AM
                    </div>
                </div>
            )}

            {/* Bot Typing Indicator */}
            {animationState.showBotTypingIndicator && (
                <div className="animated-tablet-bot-typing">
                    <TypingIndicator />
                </div>
            )}

            {/* Bot Response */}
            {animationState.showBotGreeting && (
                <div className="animated-tablet-bot-message">
                    <TypedText
                        text={botGreeting}
                        progress={Math.min(
                            100,
                            Math.max(0, ((scrollProgress - 35) / 20) * 100)
                        )}
                        showCursor={!animationState.showSummaryTitle}
                    />
                    <div className="animated-tablet-bot-message-timestamp">
                        9:42 AM
                    </div>
                </div>
            )}

            {/* Summary Items and Action Button */}
            {animationState.showSummaryTitle && (
                <div className="animated-tablet-summary-title">
                    Shift Summary
                </div>
            )}

            {animationState.showSummaryItems && (
                <div className="animated-tablet-summary-container">
                    <FadeInList
                        items={summaryItems}
                        renderItem={renderSummaryItem}
                        progress={Math.min(
                            100,
                            Math.max(0, ((scrollProgress - 65) / 20) * 100)
                        )}
                        delayBetween={150}
                    />
                </div>
            )}

            {/* Second User Message for Joe's falls query */}
            {animationState.showSecondUserMessage && (
                <div
                    className="animated-tablet-user-message"
                    style={{ marginTop: "20px" }}
                >
                    <div className="animated-tablet-user-message-text">
                        {secondUserMessage}
                    </div>
                    <div className="animated-tablet-user-message-timestamp">
                        9:45 AM
                    </div>
                </div>
            )}
        </TabletLayout>
    );
};

export default AnimatedTablet1;
