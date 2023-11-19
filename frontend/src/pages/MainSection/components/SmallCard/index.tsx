import React from "react";
import { HiPlay, HiPause } from "react-icons/hi2";
import { NowPlayingStore } from "../../../../store/nowplaying.store";

interface SmallCardProps {
    label: string;
    image: string;
    contentType: string;
    contentID: BigInt;
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
    const nowPlayingStore = NowPlayingStore();

    const PlayPauseButton = () => {
        if (
            nowPlayingStore.trackID &&
            ((contentType == "album" && contentID == nowPlayingStore.albumID) ||
                (contentType == "playlist" &&
                    contentID == nowPlayingStore.playlistID) ||
                (contentType == "artist" &&
                    contentID == nowPlayingStore.artistID))
        ) {
            return (
                <button className="bg-malachite p-2 rounded-full">
                    <HiPause size={18} />
                </button>
            );
        }
        return (
            <button className="bg-malachite p-2 rounded-full hidden group-hover:block duration-300">
                <HiPlay size={18} />
            </button>
        );
    };

    return (
        <div
            className={`h-[${HEIGHT}] bg-eerie hover:bg-neutral-700 inline-flex gap-3 w-full rounded-sm items-center justify-between duration-300 group cursor-pointer`}
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
            <div className="p-2">{PlayPauseButton()}</div>
        </div>
    );
};

export default SmallCard;
