import React from "react";
import PlayPauseButton from "../PlayPauseButton";

interface BigCardProps {
    label: string;
    description: string;
    image: string;
    contentType: string;
    contentID: number;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const BigCard: React.FC<BigCardProps> = ({
    label,
    image,
    description,
    contentType,
    contentID,
    onClick,
}) => {
    return (
        <div
            className={`flex-col h-[250px] w-[175px] rounded-lg items-center gap-2 bg-eerie hover:bg-neutral-700 group duration-150 cursor-pointer`}
        >
            <div className="w-[175px] h-[175px] flex items-center justify-center">
                <div
                    className="rounded-lg w-[150px] h-[150px] relative"
                    style={{
                        backgroundImage: "url(" + image + ")",
                        backgroundSize: "cover",
                    }}
                >
                    <PlayPauseButton
                        style={
                            "absolute top-[115px] left-[105px] group-hover:-translate-y-[10px] duration-150  group-hover:opacity-100 "
                        }
                        contentID={contentID}
                        contentType={contentType}
                    />
                </div>
            </div>

            <div className="flex-col gap-2 py-1 px-3 w-[175px]">
                <h1 className="text-white font-bold w-full text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {label}
                </h1>
                <p className="text-silver text-sm w-full whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default BigCard;
