import { DashboardPage, LoginPage } from "./pages";
import { Layout } from "./components";
import { useGetIsUserAuthenticated } from "./store";

const App = () => {
  const isAuthenticated = useGetIsUserAuthenticated();

  return (
    <div className="full-size">
      <Layout>{isAuthenticated ? <DashboardPage /> : <LoginPage />}</Layout>
    </div>
  );
};

export default App;
