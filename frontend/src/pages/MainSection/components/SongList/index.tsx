import React, { useState } from "react";
import { useAlbumTracks } from "../../hooks/useAlbum";

interface SongListProps {
    id: number;
}

interface Track {
    id: number;
    name: string;
    artists: Track_Artist[];
    album: Track_Album;
    playcount: number;
    track_number: number;
}

interface Track_Artist {
    id: number;
    name: string;
}

interface Track_Album {
    id: number;
    name: string;
}

const PlaylistItem: React.FC<Track> = ({ track_number, name, playcount }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            className="grid gap-5 grid-cols-[36px_repeat(5,_minmax(0,_1fr))] p-4 hover:bg-neutral-700  m-3 rounded-md"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="text-neutral-400 pl-2">
                {isHovered ? <button>jjjjj</button> : track_number}
            </div>
            <div className="col-span-3 text-white">{name}</div>
            <div className="col-span-1 text-neutral-400">{playcount}</div>
            <div className="col-span-1  text-neutral-400">{"3:21"}</div>
        </div>
    );
};

const PlaylistHeader = () => {
    return (
        <div className=" text-white p-4 sticky top-0 z-10 border-b-2">
            <div className="grid grid-cols-[36px_repeat(5,_minmax(0,_1fr))]">
                <div className="col-auto">#</div>
                <div className="col-span-3">Title</div>
                <div className="col-span-1">Plays</div>
                <div className="col-span-1">Duration</div>
            </div>
        </div>
    );
};

const SongList: React.FC<SongListProps> = ({ id }) => {
    const {
        data: albumTracks,
        error: albumTracksError,
        isLoading: albumTracksIsLoading,
    } = useAlbumTracks(id);

    return (
        <div>
            <PlaylistHeader />
            <div className="overflow-y-auto max-h-screen flex-col gap-4">
                {albumTracks &&
                    albumTracks.map((song) => (
                        <PlaylistItem
                            key={song.id}
                            track_number={song.track_number}
                            name={song.name}
                            playcount={song.playcount}
                        />
                    ))}
            </div>
        </div>
    );
};

export default SongList;
