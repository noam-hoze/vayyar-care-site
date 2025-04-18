import React, { ReactNode } from "react";
import FadeInList from "./animations/FadeInList";

// Updated props
interface HowItWorksCardProps {
    children?: React.ReactNode; // Make children optional for now
    className?: string;
}

// Mock summary items for static display
const mockSummaryItems: ReactNode[] = [
    "Low activity detected for Room 201 (Jane Doe).",
    "Room 305 (Mark Smith) had 2 nighttime toilet visits.",
    "Fall detected in Room 112 (Peter Jones) - Resolved.",
];

// Helper function to render list items (copied from AnimatedTabletScene1)
const renderSummaryItem = (item: ReactNode, index: number) => (
    <div
        key={index}
        className="animated-tablet-summary-item flex items-start text-sm text-gray-700 mb-2"
    >
        <span className="animated-tablet-summary-item-bullet mr-2 text-blue-500">
            •
        </span>
        <span>{item}</span>
    </div>
);

// Updated component name and props
const HowItWorksCard: React.FC<HowItWorksCardProps> = ({
    children,
    className,
}) => {
    return (
        // Card container - acts as the grid item
        <div
            className={`bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center justify-start overflow-hidden min-h-[700px] ${
                className || ""
            }`}
        >
            {/* Restore tablet structure */}
            <div className="border-[10px] border-gray-800 rounded-[36px] bg-gray-800 relative w-[375px] max-w-[90vw] h-[700px] shadow-2xl overflow-hidden mt-4">
                <div className="tablet-notch absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[20px] bg-gray-800 rounded-b-xl z-10"></div>
                <div className="tablet-screen w-full h-full bg-white rounded-[26px] overflow-hidden flex flex-col">
                    <div className="tablet-header h-[40px] bg-gray-100 border-b border-gray-200 flex items-center justify-between px-3 flex-shrink-0">
                        <span className="text-xs font-semibold text-gray-600">
                            9:41 AM
                        </span>
                        <span className="text-xs font-semibold text-gray-600">
                            􀙫 􀙀 􀘿
                        </span>
                    </div>

                    <div className="tablet-metrics flex justify-around items-center py-3 border-b border-gray-200 flex-shrink-0">
                        <div className="metric-item text-center">
                            <div className="value text-xl font-bold text-gray-700">
                                0
                            </div>
                            <div className="label text-xs text-gray-500">
                                Alerts
                            </div>
                        </div>
                        <div className="divider w-px h-6 bg-gray-200"></div>
                        <div className="metric-item text-center">
                            <div className="value text-xl font-bold text-gray-700">
                                0
                            </div>
                            <div className="label text-xs text-gray-500">
                                Critical
                            </div>
                        </div>
                        <div className="divider w-px h-6 bg-gray-200"></div>
                        <div className="metric-item text-center">
                            <div className="value text-xl font-bold text-gray-700">
                                8
                            </div>
                            <div className="label text-xs text-gray-500">
                                Monitored
                            </div>
                        </div>
                    </div>

                    <div className="tablet-content flex-grow p-3 text-left overflow-y-auto">
                        {/* User Query Bubble */}
                        <div className="user-query bg-blue-500 text-white p-2 rounded-lg rounded-br-none ml-auto max-w-[80%] mb-2">
                            <p className="text-sm">
                                Show me yesterday&apos;s summary
                            </p>
                            <p className="text-xs text-blue-100 text-right mt-1">
                                9:41 AM
                            </p>
                        </div>
                        {/* Bot Response Bubble */}
                        <div className="bot-response bg-gray-100 text-gray-800 p-2 rounded-lg rounded-bl-none mr-auto max-w-[80%] mb-4">
                            <p className="text-sm">
                                Good morning Alice! Here&apos;s your shift
                                summary.
                            </p>
                        </div>

                        {/* Summary Title */}
                        <div className="text-lg font-semibold text-gray-800 mb-2">
                            Shift Summary
                        </div>
                        {/* Summary List */}
                        <FadeInList
                            items={mockSummaryItems}
                            renderItem={renderSummaryItem}
                            progress={100}
                            delayBetween={0}
                        />
                    </div>

                    {/* Chat Input Area - Added */}
                    <div className="tablet-input flex p-3 border-t border-gray-200 bg-white flex-shrink-0">
                        <input
                            type="text"
                            placeholder="Ask Vayyar something..."
                            className="flex-grow border border-gray-300 rounded-full px-4 py-2 mr-2 text-sm"
                            readOnly
                        />
                        <button className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                            {/* Placeholder Send Icon */}
                            <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 16.571V11a1 1 0 112 0v5.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Updated export name
export default HowItWorksCard;
