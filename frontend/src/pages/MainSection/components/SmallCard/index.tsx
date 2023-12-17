import React from "react";
import PlayPauseButton from "../PlayPauseButton";

interface SmallCardProps {
    label: string;
    image: string;
    contentType: string;
    contentID: number;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const SmallCard: React.FC<SmallCardProps> = ({
    label,
    image,
    contentType,
    contentID,
    onClick,
}) => {
    const HEIGHT = "58px";

    return (
        <div
            className={`h-[${HEIGHT}] bg-eerie hover:bg-neutral-700 inline-flex gap-3 w-full rounded-md items-center justify-between duration-150 group cursor-pointer`}
        >
            <div className="inline-flex gap-3 w-full items-center">
                <img
                    className="rounded-l-md drop-shadow-md"
                    src={image}
                    alt=""
                    height={HEIGHT}
                    width={HEIGHT}
                />
                <p className="text-white font-bold text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {label}
                </p>
            </div>
            <div className="p-2">
                <PlayPauseButton
                    contentID={contentID}
                    contentType={contentType}
                    style="group-hover:opacity-100 duration-150"
                />
            </div>
        </div>
    );
};

export default SmallCard;
