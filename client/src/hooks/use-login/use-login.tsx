import { ChangeEvent, FormEvent, useMemo, useState } from "react";

// store
import { useGetSystemUsed, useSetAccessToken, useSetUserId } from "../../store";

// repositories
import { AuthRepository } from "../../repositories";

// services
import {
  AuthFetchJsonServerService,
  AuthKyJsonServerService,
} from "../../services";

export const useLogin = () => {
  const systemUsed = useGetSystemUsed();

  const authRepository: AuthRepository = useMemo(() => {
    if (systemUsed === "KY_JSON_SERVER") {
      return new AuthRepository(new AuthKyJsonServerService());
    }
    if (systemUsed === "FETCH_JSON_SERVER") {
      return new AuthRepository(new AuthFetchJsonServerService());
    }
    if (systemUsed === "NODE") {
      return new AuthRepository(new AuthFetchJsonServerService());
    }
    throw new Error("Invalid systemUsed value");
  }, [systemUsed]);

  const setUserId = useSetUserId();
  const setAccessToken = useSetAccessToken();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isReadyToLogin = email && password;

  const handleSetEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setEmail(event.target.value);
  };

  const handleSetPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setPassword(event.target.value);
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isReadyToLogin) {
      setError("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    const response = await authRepository.signIn(email, password);

    console.log("response", response);

    if (response) {
      setUserId(response.userId);
      setAccessToken(response.accessToken);
    }

    if (!response) {
      setError("Login failed");
    }

    setIsSubmitting(false);
  };

  return {
    email,
    password,
    isSubmitting,
    error,
    handleSetEmail,
    handleSetPassword,
    handleLogin,
  };
};
