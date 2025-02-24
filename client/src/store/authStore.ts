import { create } from "zustand";
import useMe from "../hooks/auth/useMe";
interface AuthState {
  user: {
    sub: string;
    username: string;
  } | null;
  setUser: (user: { sub: string; username: string }) => void;
  clearUser: () => void;
}

export const useUserStore = create<AuthState>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),
}));
