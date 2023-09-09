import { StoreSlice, System, User } from "../../models";

type UserState = {
  user: User;
};

type UserActions = {
  setUserId: (userId: number) => void;
  setAccessToken: (accessToken: string | null) => void;
  setSystemUsed: (system: System) => void;
};

export type UserSlice = UserState & UserActions;

// @ts-ignore
export const createUserSlice: StoreSlice<UserSlice> = (set) => ({
  user: {
    id: null,
    accessToken: null,
    systemUsed: "NODE",
  },

  setUserId: (userId: number) =>
    set(
      (state) => ({ user: { ...state.user, id: userId } }),
      false,
      // @ts-ignore
      "setUserId",
    ),
  setAccessToken: (accessToken: string | null) =>
    set(
      (state) => ({ user: { ...state.user, accessToken } }),
      false,
      // @ts-ignore
      "setAccessToken",
    ),
  setSystemUsed: (system: System) =>
    set(
      (state) => ({ user: { ...state.user, systemUsed: system } }),
      false,
      // @ts-ignore
      "setSystemUsed",
    ),
});
