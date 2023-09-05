import "./nav.styles.css";

import {
  useGetIsUserAuthenticated,
  useGetSystemUsed,
  useSetAccessToken,
} from "../../store";

export const Nav = () => {
  const isAuthenticated = useGetIsUserAuthenticated();
  const systemUsed = useGetSystemUsed();
  const setAccessToken = useSetAccessToken();

  const handleLogout = () => {
    setAccessToken(null);
  };

  return (
    <nav>
      <div className="flex-container">
        <div className="flex-container">System: {systemUsed}</div>

        <div className="flex-container-center">
          <h1>Todo App</h1>
        </div>

        <div className="flex-container-flex-end">
          {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
        </div>
      </div>
    </nav>
  );
};
