import React from "react";

// Updated props
interface HowItWorksCardProps {
    children?: React.ReactNode; // Make children optional for now
    className?: string;
}

// Updated component name and props
const HowItWorksCard: React.FC<HowItWorksCardProps> = ({
    children,
    className,
}) => {
    return (
        // Card container - acts as the grid item
        <div
            className={`bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center justify-center overflow-hidden min-h-[700px] ${
                className || ""
            }`}
        >
            {/* Restore tablet structure */}
            <div className="border-[10px] border-gray-800 rounded-[36px] bg-gray-800 relative w-[375px] max-w-[90vw] h-[700px] shadow-2xl overflow-hidden mt-4">
                <div className="tablet-notch absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[20px] bg-gray-800 rounded-b-xl z-10"></div>
                <div className="tablet-screen w-full h-full bg-white rounded-[26px] overflow-hidden flex flex-col">
                    <div className="tablet-header h-[40px] bg-gray-100 border-b border-gray-200 flex items-center justify-between px-3">
                        <span className="text-xs font-semibold text-gray-600">
                            9:41 AM
                        </span>
                        <span className="text-xs font-semibold text-gray-600">
                            􀙫 􀙀 􀘿
                        </span>
                    </div>
                    <div className="tablet-content flex-grow p-3 text-left">
                        <p className="text-sm text-gray-700">
                            Tablet Content Area
                        </p>
                        {/* You can place actual content/children here when needed */}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Updated export name
export default HowItWorksCard;
