import { useStore } from "../store.ts";

// setters
export const useSetLogin = () => useStore((state) => state.login);

export const useSetLogout = () => useStore((state) => state.logout);

export const useSetUserId = () => useStore((state) => state.setUserId);

export const useSetAccessToken = () =>
  useStore((state) => state.setAccessToken);

export const useSetSystemUsed = () => useStore((state) => state.setSystemUsed);

// getters

export const useGetIsUserAuthenticated = () =>
  useStore((state) => state.user.isAuthenticated);

export const useGetUserId = () => useStore((state) => state.user.id);

export const useGetAccessToken = () =>
  useStore((state) => state.user.accessToken);

export const useGetSystemUsed = () =>
  useStore((state) => state.user.systemUsed);
