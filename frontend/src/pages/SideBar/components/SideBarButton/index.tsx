import React from "react";
import { IconType } from "react-icons";
// import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface SideBarButtonProps {
    label: string;
    icon: IconType;
    iconFill?: IconType;
    isActive?: boolean;
    href: string;
}

const SideBarButton: React.FC<SideBarButtonProps> = ({
    label,
    icon: Icon,
    iconFill: IconFill,
    isActive,
    href,
}) => {
    const buttonColor = isActive ? "text-white" : "text-silver";
    const ButtonIcon = isActive && IconFill ? IconFill : Icon;

    return (
        <a
            href={href}
            className={twMerge(
                buttonColor,
                "hover:text-white cursor-pointer transition flex p-2"
            )}
        >
            <ButtonIcon size={22} />
            <p className={"pl-4 text-sm font-bold"}>{label}</p>
        </a>
    );
};

export default SideBarButton;
