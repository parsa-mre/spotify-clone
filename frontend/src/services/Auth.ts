import Api from "../utils/api";
import { AUTH_ENDPOINTS } from "./endpoints";

interface RegisterInterface {
    username: string;
    email: string;
    password: string;
    birth_date: string;
    country: string;
    gender: string;
}

interface LoginInterface {
    email: string;
    password: string;
}

interface RefreshInterface {
    refresh: string;
}

const register = async (data: RegisterInterface) => {
    return Api.post(AUTH_ENDPOINTS.register(), data, {
        params: { remove_token: true },
    });
};

const refresh = async (data: RefreshInterface) => {
    return Api.post(AUTH_ENDPOINTS.refresh(), data, {
        params: { remove_token: true },
    });
};

const login = async (data: LoginInterface) => {
    return Api.post(AUTH_ENDPOINTS.login(), data, {
        params: { remove_token: true },
    });
};

export { login, register, refresh };
