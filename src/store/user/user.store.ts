import { StoreSlice, System, User } from "../../models";

export type UserSlice = {
  user: User;
  login: () => void;
  logout: () => void;
  setUserId: (id: number) => void;
  setAccessToken: (accessToken: string) => void;
  setSystemUsed: (system: System) => void;
};

export const createUserSlice: StoreSlice<UserSlice> = (set) => ({
  user: {
    id: 0,
    isAuthenticated: false,
    accessToken: "",
    systemUsed: "JSON_SERVER",
  },
  login: () => {
    set(
      (state) => ({ user: { ...state.user, isAuthenticated: true } }),
      false,
      // @ts-ignore
      "login",
    );
  },
  logout: () => {
    set(
      (state) => ({ user: { ...state.user, isAuthenticated: false } }),
      false,
      // @ts-ignore
      "logout",
    );
  },
  setUserId: (id: number) => {
    set(
      (state) => ({ user: { ...state.user, id } }),
      false,
      // @ts-ignore
      "setUserId",
    );
  },
  setAccessToken: (accessToken: string) => {
    set(
      (state) => ({ user: { ...state.user, accessToken } }),
      false,
      // @ts-ignore
      "setAccessToken",
    );
  },
  setSystemUsed: (system: System) => {
    set(
      (state) => ({ user: { ...state.user, systemUsed: system } }),
      false,
      // @ts-ignore
      "setSystemUsed",
    );
  },
});
