import Login from "./pages/Login";
import { KEYS } from "./constants";
import { useAuth } from "./context/AuthContext";
import TwoFactorAuth from "./pages/TwoFactorAuth";

function App() {
  const { step } = useAuth();

  switch (step) {
    case KEYS.login:
      return <Login />;
    case KEYS.auth:
      return <TwoFactorAuth />;
    default:
      return <Login />;
  }
}

export default App;
