import React from "react";
import TopBar from "../components/TopBar";
import { useParams } from "react-router-dom";
import { useAlbum, useAlbumTracks } from "../hooks/useAlbum";
import { useArtist } from "../hooks/useArtist";
import { dataTagSymbol } from "@tanstack/react-query";
import { FaCircle } from "react-icons/fa";
import PlayPauseButton from "../components/PlayPauseButton";
import { PiShuffle } from "react-icons/pi";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import SongList from "../components/SongList";

function AlbumPlaylistPage() {
    const { id: contentID } = useParams();
    const {
        data: album,
        error: albumError,
        isLoading: albumIsLoading,
    } = useAlbum(Number(contentID));

    const {
        data: tracks,
        error: tracksError,
        isLoading: tracksIsLoading,
    } = useAlbumTracks(Number(contentID));

    const {
        data: artist,
        error: artistError,
        isLoading: artistIsLoading,
    } = useArtist(Number(album?.artist));

    const PlaylistHeader = () => {
        return (
            <div className="bg-gray-800 text-white p-4 sticky top-0 z-10">
                <div className="grid grid-cols-5">
                    <div className="col-span-1">#</div>
                    <div className="col-span-3">Title</div>
                    <div className="col-span-1">Plays</div>
                    <div className="col-span-1">Duration</div>
                </div>
            </div>
        );
    };

    const PlaylistItem = ({ number, title, plays, duration }) => {
        return (
            <div className="grid grid-cols-6 p-4 border-b">
                <div className="col-span-1">{number}</div>
                <div className="col-span-3">{title}</div>
                <div className="col-span-1">{plays}</div>
                <div className="col-span-1">{duration}</div>
            </div>
        );
    };

    const playlistData = [
        { number: 1, title: "Song 1", plays: 100, duration: "3:30" },
        { number: 2, title: "Song 2", plays: 150, duration: "4:15" },
        { number: 3, title: "Song 2", plays: 150, duration: "4:15" },
        { number: 4, title: "Song 2", plays: 150, duration: "4:15" },
        { number: 5, title: "Song 2", plays: 150, duration: "4:15" },
        { number: 6, title: "Song 2", plays: 150, duration: "4:15" },
        { number: 7, title: "Song 2", plays: 150, duration: "4:15" },
        { number: 8, title: "Song 2", plays: 150, duration: "4:15" },
        { number: 9, title: "Song 2", plays: 150, duration: "4:15" },
        { number: 10, title: "Song 2", plays: 150, duration: "4:15" },
        { number: 11, title: "Song 2", plays: 150, duration: "4:15" },
        { number: 12, title: "Song 2", plays: 150, duration: "4:15" },
        { number: 13, title: "Song 2", plays: 150, duration: "4:15" },
        { number: 14, title: "Song 2", plays: 150, duration: "4:15" },
        { number: 15, title: "Song 2", plays: 150, duration: "4:15" },
        // Add more songs as needed
    ];

    return (
        <div className="h-[100vh] w-full bg-night flex-col rounded-lg overflow-x-auto">
            <TopBar />
            <div className="w-full max-h-[250px] bg-emerald-900 flex items-end">
                <div className="max-h-[250px] max-w-[250px] p-5">
                    <img
                        className=" shadow-2xl rounded-md bg-night min-w-[100px] min-h-[100px]"
                        src={album?.image}
                        alt=""
                    />
                </div>
                <div className="min-w-[300px] max-h-[250px] h-full flex-col items-end pb-5 gap-2">
                    <p className="text-white text-xs">Album</p>
                    <p className="my-2 text-5xl text-white font-bold">
                        {album?.name}
                    </p>
                    <div className="inline-flex items-center gap-2">
                        <p className="text-sm text-white font-bold">
                            {artist?.name}
                        </p>
                        <FaCircle className="text-white" size={5} />
                        <p className="text-sm text-white">
                            {album &&
                                new Date(album.release_date).getFullYear()}
                        </p>
                        <FaCircle className="text-white" size={5} />
                        <p className="text-sm text-white">
                            {tracks && tracks?.length}{" "}
                            {tracks && tracks?.length > 1 ? "songs" : "song"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="h-[90px] inline-flex gap-4 items-center px-4 py-2">
                <PlayPauseButton
                    contentType="album"
                    contentID={Number(contentID)}
                    style="opacity-100 p-4"
                    // size={}
                />
                <PiShuffle className="text-silver" size={27} />
                <HiOutlineHeart className="text-silver" size={27} />
                <IoArrowDownCircleOutline className="text-silver" size={27} />
            </div>
            <div>
                <SongList id={Number(contentID)} />
            </div>

            {/* {tracks?.map((track) => <p className="text-white">{track.name}</p>)} */}
        </div>
    );
}

export default AlbumPlaylistPage;
