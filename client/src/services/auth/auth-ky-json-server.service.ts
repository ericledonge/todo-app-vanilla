import ky from "ky";

import { AuthService } from "./auth.service.ts";
import { SignInResponse } from "../../repositories";

type SignInJsonServerResponse = {
  user: {
    id: number;
    email: string;
  };
  accessToken: string;
};

export class AuthKyJsonServerService implements AuthService {
  async signIn(email: string, password: string): Promise<SignInResponse> {
    console.log("Service: signIn - AuthKyFetchJsonServerService");

    const response: SignInJsonServerResponse = await ky
      .post("http://localhost:4000/login", {
        headers: { "Content-Type": "application/json" },
        json: { email, password },
      })
      .json();

    return {
      userId: response.user.id,
      accessToken: response.accessToken,
    };
  }

  async signOut(): Promise<void> {
    console.log("Service: signOut - AuthKyFetchJsonServerService");
  }
}
