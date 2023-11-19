import { create } from "zustand";
import { Token } from "./types";
import { persist } from "zustand/middleware";

interface Store {
    token: Token | null;
    setToken: (token: Token | null) => void;
}

export const useAuthStore = create<Store>()(
    persist(
        (set) => ({
            token: null,
            setToken: (token) => set({ token: token }),
        }),
        { name: "auth-tokens" }
    )
);

// export const useAuthStore = create<Store>(
//     (set) => {
//     return {
//         token: null,
//         setToken: (token) => set((state) => ({ ...state, token })),
//     };
// });

export default useAuthStore;
