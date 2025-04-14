import React, { ReactNode } from "react";

// Constants
export const COLORS = {
    vayyarBlue: "rgba(5, 170, 233, 1)",
    primary: "#2D7DD2",
    secondary: "#6C757D",
    success: "#3EBD93",
    warning: "#F39C12",
    danger: "#E63946",
    light: "#F8F9FA",
    dark: "#343A40",
    white: "#FFFFFF",
    border: "#E0E0E0",
};

// Prop Types
interface SectionProps {
    title?: ReactNode;
    icon?: ReactNode;
    children: ReactNode;
    className?: string;
}

interface CardProps {
    title?: ReactNode;
    subtitle?: ReactNode;
    children: ReactNode;
    footer?: ReactNode;
    accentColor?: string;
    className?: string;
}

interface BadgeProps {
    text: ReactNode;
    color?: string;
    className?: string;
}

type AlertType = "critical" | "warning" | "info";
interface AlertProps {
    title?: ReactNode;
    content: ReactNode;
    type?: AlertType;
    icon?: ReactNode;
    action?: ReactNode;
    className?: string;
}

type ButtonVariant = "primary" | "secondary" | "danger";
interface ButtonProps {
    text: ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: ButtonVariant;
    className?: string;
}

interface ListItemProps {
    title?: ReactNode;
    body?: ReactNode;
    icon?: ReactNode;
    rightContent?: ReactNode;
    className?: string;
}

interface ChatBubbleProps {
    content: ReactNode;
    timestamp?: string;
    isUser?: boolean;
    className?: string;
}

/**
 * Section component with title and content
 */
export const Section: React.FC<SectionProps> = ({
    title,
    icon,
    children,
    className = "",
}) => (
    <div className={`tablet-scene-section ${className}`}>
        {title && (
            <h3 className="tablet-scene-section-title">
                {icon && (
                    <span className="tablet-scene-section-icon">{icon}</span>
                )}
                {title}
            </h3>
        )}
        <div className="tablet-scene-section-content">{children}</div>
    </div>
);

/**
 * Card component for content blocks
 */
export const Card: React.FC<CardProps> = ({
    title,
    subtitle,
    children,
    footer,
    accentColor,
    className = "",
}) => (
    <div
        className={`tablet-scene-card ${className}`}
        style={accentColor ? { borderLeft: `4px solid ${accentColor}` } : {}}
    >
        {title && (
            <div className="tablet-scene-card-header">
                <div className="tablet-scene-card-header-title">{title}</div>
                {subtitle && (
                    <div className="tablet-scene-card-header-subtitle">
                        {subtitle}
                    </div>
                )}
            </div>
        )}
        <div className="tablet-scene-card-content">{children}</div>
        {footer && <div className="tablet-scene-card-footer">{footer}</div>}
    </div>
);

/**
 * Badge/Label component
 */
export const Badge: React.FC<BadgeProps> = ({
    text,
    color,
    className = "",
}) => (
    <div
        className={`tablet-scene-badge ${className}`}
        style={{
            backgroundColor: color,
            color: color
                ? isLightColor(color)
                    ? "#343A40"
                    : "#FFFFFF"
                : undefined,
        }}
    >
        {text}
    </div>
);

/**
 * Alert/Banner component
 */
export const Alert: React.FC<AlertProps> = ({
    title,
    content,
    type = "info",
    icon,
    action,
    className = "",
}) => {
    // Determine colors based on type
    const typeClasses: Record<AlertType, string> = {
        critical: "tablet-scene-alert-critical",
        warning: "tablet-scene-alert-warning",
        info: "tablet-scene-alert-info",
    };

    return (
        <div
            className={`tablet-scene-alert ${
                typeClasses[type] || ""
            } ${className}`}
        >
            {icon && <div className="tablet-scene-alert-icon">{icon}</div>}
            <div className="tablet-scene-alert-content">
                {title && (
                    <div className="tablet-scene-alert-title">{title}</div>
                )}
                {content}
            </div>
            {action && (
                <div className="tablet-scene-alert-action">{action}</div>
            )}
        </div>
    );
};

/**
 * Button component
 */
export const Button: React.FC<ButtonProps> = ({
    text,
    onClick,
    variant = "primary",
    className = "",
}) => {
    const variantClass = `tablet-scene-button-${variant}`;

    return (
        <button
            className={`tablet-scene-button ${variantClass} ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

/**
 * List Item component
 */
export const ListItem: React.FC<ListItemProps> = ({
    title,
    body,
    icon,
    rightContent,
    className = "",
}) => (
    <div className={`tablet-scene-list-item ${className}`}>
        {icon && <div className="tablet-scene-list-item-icon">{icon}</div>}
        <div className="tablet-scene-list-item-content">
            {title && (
                <div className="tablet-scene-list-item-title">{title}</div>
            )}
            {body && <div className="tablet-scene-list-item-body">{body}</div>}
        </div>
        {rightContent && (
            <div className="tablet-scene-list-item-right">{rightContent}</div>
        )}
    </div>
);

/**
 * Chat Message Bubble component
 */
export const ChatBubble: React.FC<ChatBubbleProps> = ({
    content,
    timestamp,
    isUser = false,
    className = "",
}) => {
    const bubbleClass = isUser
        ? "tablet-scene-chat-bubble-user"
        : "tablet-scene-chat-bubble-bot";

    return (
        <div className={`tablet-scene-chat-bubble ${bubbleClass} ${className}`}>
            <div className="tablet-scene-chat-bubble-content">{content}</div>
            {timestamp && (
                <div className="tablet-scene-chat-bubble-timestamp">
                    {timestamp}
                </div>
            )}
        </div>
    );
};

// Helper function to determine if a color is light or dark
const isLightColor = (color: string): boolean => {
    // Simple implementation - can be improved for better contrast detection
    if (!color || !color.startsWith("#")) return false;

    const hex = color.replace("#", "");
    if (hex.length !== 6) return false;

    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    if (isNaN(r) || isNaN(g) || isNaN(b)) return false;

    // Calculate brightness using human perception of colors
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
};
