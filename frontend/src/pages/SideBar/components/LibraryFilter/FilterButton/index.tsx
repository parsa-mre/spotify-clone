import React from "react";
import { twMerge } from "tailwind-merge";

interface FilterButtonProps {
    label: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    isActive?: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({
    label,
    onClick,
    isActive,
}) => {
    const activeStyle = isActive
        ? "bg-white text-black"
        : "hover:bg-neutral-700";

    return (
        <button
            className={twMerge(
                "p-1 text-white whitespace-nowrap text-sm font-normal bg-eerie px-3 py-1 rounded-full transition-all",
                activeStyle
            )}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default FilterButton;
