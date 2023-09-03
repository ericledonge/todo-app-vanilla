export type System = "JSON_SERVER" | "Connected";

export type User = {
  id: number;
  isAuthenticated: boolean;
  accessToken: string;
  systemUsed: System;
};
