import React from "react";

interface BenefitCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const Card = React.forwardRef<HTMLDivElement, BenefitCardProps>(({ icon, title, description }, ref) => {
    return (
        // Benefit Item - Square, Basis ~1/5, No Shrinking
        <div ref={ref} className="basis-[22%] flex-shrink-0 aspect-square bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center justify-center overflow-hidden">
            {/* Centered Icon Wrapper */}
            <div className="w-12 h-12 bg-[#e0f6ff] text-[#06aeef] rounded-full flex items-center justify-center mb-4 flex-shrink-0">
                {icon}
            </div>
            {/* Centered Text */}
            <h3 className="text-xl font-bold mb-2 text-gray-900 text-center">
                {title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed text-center">
                {description}
            </p>
        </div>
    );
});

Card.displayName = 'Card'; // Set display name for debugging

export default Card;
