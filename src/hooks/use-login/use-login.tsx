import { ChangeEvent, FormEvent, useState } from "react";

// services
import { signIn } from "../../services";

// store
import { useSetAccessToken, useSetLogin, useSetUserId } from "../../store";

export const useLogin = () => {
  const setLogin = useSetLogin();
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
    const response = await signIn(email, password);
    if (response) {
      setLogin();
      setUserId(response.user.id);
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
