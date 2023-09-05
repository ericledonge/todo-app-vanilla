import { AuthService } from "./auth.service.ts";
import { SignInResponse } from "../../repositories";

type SignInJsonServerResponse = {
  user: {
    id: number;
    email: string;
  };
  accessToken: string;
};

export class AuthFetchJsonServerService implements AuthService {
  async signIn(email: string, password: string): Promise<SignInResponse> {
    console.log("Service: signIn - AuthFetchJsonServerServices");

    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Something went wrong, status code: ${response.status}`);
    }

    const data: SignInJsonServerResponse = await response.json();

    return {
      userId: data.user.id,
      accessToken: data.accessToken,
    };
  }

  async signOut(): Promise<void> {
    console.log("Service: signOut - AuthFetchJsonServerServices");
  }
}
