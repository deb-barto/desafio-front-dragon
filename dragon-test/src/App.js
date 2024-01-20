import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from "./components/LoginComponent/Login";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import Profile from "./components/Profile/Profile";
import DragonList from "./components/Cards/DragonList";
function App() {
  const { isLoading, error } = useAuth0();

  return (
    <main className="column">
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          <LoginButton />
          <Header/>
          <Banner/>
          <Profile />
          <DragonList/>
        </>
      )}
    </main>
  );
}

export default App;