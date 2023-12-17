import { create } from "zustand";

interface User {
    trackID: number | null;
    albumID: number | null;
    playlistID: number | null;
    artistID: number | null;
    setNowPlaying: (trackData: {
        trackID: number | null;
        albumID: number | null;
        playlistID: number | null;
        artistID: number | null;
    }) => void;
}

export const NowPlayingStore = create<User>((set) => ({
    trackID: null,
    albumID: null,
    playlistID: null,
    artistID: null,
    setNowPlaying: (trackData) => set(trackData),
}));
