import { SignInResponse } from "../../repositories";

export interface AuthService {
  signIn: (email: string, password: string) => Promise<SignInResponse>;
  signOut: () => Promise<void>;
}
