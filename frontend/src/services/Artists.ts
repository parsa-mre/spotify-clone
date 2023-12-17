import Api from "../utils/api";
import { ARTISTS_ENDPOINTS } from "./endpoints";

const getArtist = async (id: number) => {
    return Api.get(ARTISTS_ENDPOINTS.getArtist(id), {
        params: { remove_token: true },
    });
};

const getArtistAlbums = async (id: number) => {
    return Api.get(ARTISTS_ENDPOINTS.getArtistAlbums(id), {
        params: { remove_token: true },
    });
};

const getArtistTopTracks = async (id: number) => {
    return Api.get(ARTISTS_ENDPOINTS.getArtistTopTracks(id), {
        params: { remove_token: true },
    });
};

export { getArtist, getArtistAlbums, getArtistTopTracks };
