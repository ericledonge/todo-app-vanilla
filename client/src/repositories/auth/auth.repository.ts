import { AuthService } from "../../services";

export interface IAuthRepository {
  signIn(email: string, password: string): Promise<SignInResponse>;
  signOut(): Promise<void>;
}

export type SignInResponse = {
  userId: number;
  accessToken: string;
};

export class AuthRepository implements IAuthRepository {
  constructor(private authServ: AuthService) {}

  public async signIn(
    email: string,
    password: string,
  ): Promise<SignInResponse> {
    const response = await this.authServ.signIn(email, password);
    const output = {
      userId: response.userId,
      accessToken: response.accessToken,
    };

    return output;
  }

  public async signOut(): Promise<void> {
    return await this.authServ.signOut();
  }
}
