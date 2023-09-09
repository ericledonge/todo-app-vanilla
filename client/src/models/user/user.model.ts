export type System = "KY_JSON_SERVER" | "FETCH_JSON_SERVER" | "NODE";

export type User = {
  id: number | null;
  accessToken: string | null;
  systemUsed: System;
};
