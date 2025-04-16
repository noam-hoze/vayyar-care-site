import React from "react";

interface BenefitCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
    icon,
    title,
    description,
}) => {
    return (
        // Each Benefit Item - Style remains the same
        <div className="w-full sm:w-[45%] lg:w-[22%] bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300">
            {/* Centered Icon Wrapper */}
            <div className="mx-auto w-12 h-12 bg-[#e0f6ff] text-[#06aeef] rounded-full flex items-center justify-center mb-4">
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
};

export default BenefitCard;
