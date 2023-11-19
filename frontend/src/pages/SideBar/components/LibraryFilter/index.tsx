import React, { useRef, useState } from "react";
import FilterButton from "./FilterButton";
import {
    HiOutlineChevronRight,
    HiOutlineChevronLeft,
    HiOutlineXMark,
} from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

interface LibraryFilterProps {
    selectedFilter: string;
    setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}

const LibraryFilter: React.FC<LibraryFilterProps> = ({
    selectedFilter,
    setSelectedFilter,
}) => {
    const filters = ["Playlists", "Podcasts & Shows", "Albums", "Artists"];

    const scrollRef = useRef<HTMLDivElement>(null);

    const [scrollAmount, setScrollAmount] = useState(0);

    const handleScroll = () => {
        const { scrollLeft } = scrollRef.current as HTMLDivElement;
        setScrollAmount(scrollLeft);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        const target = event.target as HTMLElement;

        setSelectedFilter(target.innerText ?? "");
    };

    const leftButtonsStyle = () => {
        return scrollAmount < 16 ? "hidden" : "flex items-center justify-begin";
    };

    const rightButtonsStyle = () => {
        if (scrollRef.current) {
            const { scrollWidth, offsetWidth } =
                scrollRef.current as HTMLDivElement;
            return scrollWidth && scrollWidth - scrollAmount - offsetWidth < 16
                ? "hidden"
                : "flex items-center justify-end";
        }
        return "flex items-center justify-end";
    };

    return (
        <div className="px-1 w-full py-2 overflow-hidden justify-center relative h-9">
            {selectedFilter == "" ? (
                <>
                    <div
                        ref={scrollRef}
                        className="flex px-1 h-7 w-full overflow-x-auto gap-2 absolute pointer-events-auto no-scrollbar"
                        onScroll={handleScroll}
                    >
                        {filters.map((label) => (
                            <FilterButton
                                key={label}
                                isActive={false}
                                label={label}
                                onClick={handleClick}
                            />
                        ))}
                    </div>
                    <div
                        className={twMerge(
                            "absolute h-7 w-full bg-gradient-to-r from-night from-10% to-transparent to-40% pointer-events-none",
                            leftButtonsStyle()
                        )}
                    >
                        <button className="p-1 h-7 w-7 justify-center items-center flex rounded-full text-neutral-300 bg-eerie shadow-md hover:text-whitehover:bg-neutral-700 pointer-events-auto transition">
                            <HiOutlineChevronLeft size={22} />
                        </button>
                    </div>
                    <div
                        className={twMerge(
                            "absolute h-7 w-full bg-gradient-to-l from-night from-10% to-transparent to-40% pointer-events-none",
                            rightButtonsStyle()
                        )}
                    >
                        <button className="p-1 h-7 w-7 justify-center items-center flex mr-1 rounded-full text-neutral-300 bg-eerie shadow-md hover:text-white hover:bg-neutral-700 pointer-events-auto transition">
                            <HiOutlineChevronRight size={22} />
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex px-1 h-7 w-full overflow-x-auto gap-2 absolute pointer-events-auto no-scrollbar">
                    <button
                        onClick={handleClick}
                        className="p-1 h-7 w-7 justify-center items-center flex rounded-full text-neutral-300 bg-eerie shadow-md hover:text-white hover:bg-neutral-700 pointer-events-auto transition"
                    >
                        <HiOutlineXMark size={22} />
                    </button>

                    <FilterButton
                        isActive={true}
                        label={selectedFilter}
                        onClick={handleClick}
                    />
                </div>
            )}
        </div>
    );
};

export default LibraryFilter;
