import React, { useState, useEffect, useRef } from "react";

interface FadeInListProps<T> {
    items: T[];
    progress?: number;
    animationDuration?: number;
    delayBetween?: number;
    renderItem?: (item: T, index: number) => React.ReactNode;
    onComplete?: () => void;
    className?: string;
}

// A component that fades in list items sequentially based on scroll progress
const FadeInList = <T,>({
    items = [],
    progress = 0, // 0-100 scroll progress
    animationDuration = 500,
    delayBetween = 150, // Delay between animations in ms
    renderItem = (item: T, index: number) => (
        <div key={index}>{String(item)}</div>
    ),
    onComplete = () => {},
    className = "",
}: FadeInListProps<T>) => {
    const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        const totalItems = items.length; // Get length here
        if (totalItems === 0) return;

        // Calculate how many items to show based on progress
        const itemsToShow = Math.min(
            totalItems,
            Math.ceil((progress / 100) * totalItems)
        );

        // Update visible items
        const newVisibleItems =
            itemsToShow === 0
                ? []
                : Array.from({ length: itemsToShow }, (_, i) => i);

        // Only update state if the array content actually changes
        setVisibleItems((currentVisible) => {
            if (
                JSON.stringify(currentVisible) ===
                JSON.stringify(newVisibleItems)
            ) {
                return currentVisible; // No change
            }
            // Call onComplete only when transitioning to full visibility
            if (
                itemsToShow === totalItems &&
                currentVisible.length !== totalItems
            ) {
                onCompleteRef.current(); // Use ref for stable function call
            }
            return newVisibleItems;
        });
    }, [items.length, progress]); // Depend on length and progress

    // Use a ref to keep onComplete stable if needed outside effect
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

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
