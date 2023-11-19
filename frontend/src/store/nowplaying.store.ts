import { create } from "zustand";

interface User {
    trackID: BigInt | null;
    albumID: BigInt | null;
    playlistID: BigInt | null;
    artistID: BigInt | null;
    setNowPlaying: (trackData: {
        trackID: BigInt | null;
        albumID: BigInt | null;
        playlistID: BigInt | null;
        artistID: BigInt | null;
    }) => void;
}

export const NowPlayingStore = create<User>((set) => ({
    trackID: null,
    albumID: null,
    playlistID: null,
    artistID: null,
    setNowPlaying: (trackData) => set(trackData),
}));
