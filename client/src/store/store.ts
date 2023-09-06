import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { createUserSlice, UserSlice } from "./user";

export type RootStoreType = UserSlice;

export const useStore = create<RootStoreType>()(
  devtools((set, get) => ({
    ...createUserSlice(set, get),
  })),
);
