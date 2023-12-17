import { useQuery } from "@tanstack/react-query";
import {
    getArtist,
    getArtistAlbums,
    getArtistTopTracks,
} from "../../../services/Artists";

interface Artist {
    id: number;
    name: string;
    biography: string;
    image: string;
    monthly_listeners: number;
    followers_count: number;
}

const useArtist = (artistID: number) => {
    const fetchArtist = async () => {
        return await getArtist(artistID).then((res) => res.data);
    };

    return useQuery<Artist, Error>({
        queryKey: ["artists", artistID],
        queryFn: fetchArtist,
    });
};

export { useArtist };
