import axios from "axios";
import useAuthStore from "../store/auth.store";
import { refresh } from "../services/Auth";

// const authStore = useAuthStore();
const BASE_URL = "http://localhost:1337/api/";

const Api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

Api.interceptors.request.use(
    async (config) => {
        const token = useAuthStore.getState().token;
        const access_token = token?.access;

        if (access_token && !config?.params?.remove_token) {
            config.headers["Authorization"] = `Bearer ${access_token}`;
        }

        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

Api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const token = useAuthStore.getState().token;
        const originalRequest = error.config;
        if (error.response && error.response.status === 401) {
            const refreshToken = token?.refresh;

            if (refreshToken) {
                try {
                    const response = await refresh({ refresh: refreshToken });

                    if (response.data.access) {
                        useAuthStore.getState().setToken({
                            access: response.data.access,
                            refresh: refreshToken,
                        });

                        originalRequest.headers[
                            "Authorization"
                        ] = `Bearer ${response.data.access}`;

                        return axios(originalRequest);
                    }
                } catch (refreshError) {
                    // log out the user or show an error message
                }
            }
        }
        return Promise.reject(error);
    }
);

export default Api;
