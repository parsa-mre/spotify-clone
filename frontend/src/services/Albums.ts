import Api from "../utils/api";
import { ALBUMS_ENDPOINTS } from "./endpoints";

const getAlbum = async (id: number) => {
    return Api.get(ALBUMS_ENDPOINTS.getAlbum(id), {
        params: { remove_token: true },
    });
};

const getAlbumTracks = async (id: number) => {
    return Api.get(ALBUMS_ENDPOINTS.getAlbumTracks(id), {
        params: { remove_token: true },
    });
};

export { getAlbum, getAlbumTracks };
