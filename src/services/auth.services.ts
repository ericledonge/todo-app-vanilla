const signInJsonServerAuth = async (email: string, password: string) => {
  console.log("Service: signUpJsonServerAuth");

  const response = await fetch("http://localhost:4000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(`Something went wrong, status code: ${response.status}`);
  }

  return response.json();
};

export const signIn = signInJsonServerAuth;

export const signOut = () => {
  console.log("signOut");

  return true;
};
