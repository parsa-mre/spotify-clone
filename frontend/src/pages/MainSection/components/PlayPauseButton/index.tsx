import React from "react";
import { NowPlayingStore } from "../../../../store/nowplaying.store";
import { HiPlay, HiPause } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

interface PlayPauseButtonProps {
    contentType: string;
    contentID: number;
    style?: string;
    size?: number;
}

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({
    contentType,
    contentID,
    style,
    size,
}) => {
    const nowPlayingStore = NowPlayingStore();
    const buttonSize = size ?? 24;
    if (
        nowPlayingStore.trackID &&
        ((contentType == "album" && contentID == nowPlayingStore.albumID) ||
            (contentType == "playlist" &&
                contentID == nowPlayingStore.playlistID) ||
            (contentType == "artist" && contentID == nowPlayingStore.artistID))
    ) {
        return (
            <button className={twMerge("bg-malachite p-2 rounded-full", style)}>
                <HiPause size={buttonSize} />
            </button>
        );
    }
    return (
        <button
            className={twMerge(
                "bg-malachite p-2 rounded-full opacity-0 duration-300",
                style
            )}
        >
            <HiPlay size={buttonSize} />
        </button>
    );
};

export default PlayPauseButton;
