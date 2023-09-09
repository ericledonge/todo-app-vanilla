import { useLogin } from "../../hooks";

export const LoginForm = () => {
  const {
    email,
    password,
    isSubmitting,
    error,
    handleSetEmail,
    handleSetPassword,
    handleLogin,
  } = useLogin();

  return (
    <div className="column">
      <form onSubmit={handleLogin} className="column">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleSetEmail}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handleSetPassword}
        />

        <div>
          <button type="submit">
            {isSubmitting ? "In progress" : "Login"}
          </button>

          <button type="submit">
            {isSubmitting ? "In progress" : "Register"}
          </button>
        </div>
      </form>

      <div className="error-container">
        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};
