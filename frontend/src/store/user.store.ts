import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    username: string | null;
    id: BigInt | null;
    setUser: (userData: { username: string | null; id: BigInt | null }) => void;
}

export const useCurrentUserStore = create<User>()(
    persist(
        (set) => ({
            username: null,
            id: null,
            setUser: (userData) => set(userData),
        }),
        { name: "user-data" }
    )
);

export default useCurrentUserStore;
