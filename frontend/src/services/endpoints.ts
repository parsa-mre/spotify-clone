const AUTH_ENDPOINTS = {
    register: () => `/accounts/register/`,
    login: () => `/accounts/login/`,
    refresh: () => "accounts/refresh/",
};

const ALBUMS_ENDPOINTS = {
    getAlbum: (id: number) => `/albums/${id}/`,
    getAlbumTracks: (id: number) => `/albums/${id}/tracks/`,
};

const ARTISTS_ENDPOINTS = {
    getArtist: (id: number) => `/artists/${id}/`,
    getArtistAlbums: (id: number) => `/artists/${id}/albums/`,
    getArtistTopTracks: (id: number) => `/artists/${id}/top-tracks/`,
};

export { AUTH_ENDPOINTS, ALBUMS_ENDPOINTS, ARTISTS_ENDPOINTS };
