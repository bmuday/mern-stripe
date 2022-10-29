import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// context
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              exact
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              exact
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
