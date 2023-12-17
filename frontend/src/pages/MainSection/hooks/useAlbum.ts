import { useQuery } from "@tanstack/react-query";
import { getAlbum, getAlbumTracks } from "../../../services/Albums";

interface Album {
    id: number;
    name: string;
    release_date: Date;
    genre: string;
    image: string;
    artist: number;
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

const useAlbum = (albumID: number) => {
    const fetchAlbum = async () => {
        return await getAlbum(albumID).then((res) => res.data);
    };

    return useQuery<Album, Error>({
        queryKey: ["albums", albumID],
        queryFn: fetchAlbum,
    });
};

const useAlbumTracks = (albumID: number) => {
    const fetchAlbumTracks = async () => {
        return await getAlbumTracks(albumID).then((res) => res.data);
    };

    return useQuery<Track[], Error>({
        queryKey: ["albums", albumID, "tracks"],
        queryFn: fetchAlbumTracks,
    });
};

export { useAlbum, useAlbumTracks };
