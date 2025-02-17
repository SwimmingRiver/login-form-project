import { create } from "zustand";
import useMe from "../hooks/auth/useMe";
interface AuthState {
  user: {
    id: string;
    username: string;
    useremail: string;
  } | null;
  accessToken: string | null;
  isLoggedIn: boolean;
  login: (
    user: { id: string; username: string; useremail: string },
    token: string
  ) => void;
  initAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isLoggedIn: false,
  login: (user, token) => set({ user, accessToken: token, isLoggedIn: true }),
  initAuth: () => {
    const token = localStorage.getItem("accessToken");
  },
}));
export default useAuthStore;
