import React, { useState, useEffect } from "react";

// A component that fades in list items sequentially based on scroll progress
const FadeInList = ({
    items = [],
    progress = 0, // 0-100 scroll progress
    animationDuration = 500,
    delayBetween = 150, // Delay between animations in ms
    renderItem = (item, index) => <div key={index}>{item}</div>,
    onComplete = () => {},
    className = "",
}) => {
    const [visibleItems, setVisibleItems] = useState([]);

    useEffect(() => {
        if (items.length === 0) return;

        // Calculate how many items to show based on progress
        const totalItems = items.length;
        const itemsToShow = Math.min(
            totalItems,
            Math.ceil((progress / 100) * totalItems)
        );

        // Update visible items
        if (itemsToShow === 0) {
            setVisibleItems([]);
        } else {
            setVisibleItems(Array.from({ length: itemsToShow }, (_, i) => i));

            // Call onComplete when all items are visible
            if (itemsToShow === totalItems) {
                onComplete();
            }
        }
    }, [items, progress, onComplete]);

    return (
        <div className={`fade-in-list-container ${className}`}>
            {items.map((item, index) => {
                const isVisible = visibleItems.includes(index);
                const itemClassName = `fade-in-list-item ${
                    isVisible
                        ? "fade-in-list-item-visible"
                        : "fade-in-list-item-hidden"
                }`;

                return (
                    <div
                        key={index}
                        className={itemClassName}
                        style={{
                            transitionDuration: `${animationDuration}ms`,
                            transitionDelay: isVisible
                                ? `${index * delayBetween}ms`
                                : "0ms",
                        }}
                    >
                        {renderItem(item, index)}
                    </div>
                );
            })}
        </div>
    );
};

export default FadeInList;
