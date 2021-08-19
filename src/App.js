import { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import "./components/Navbar";
import NavBar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import LoginContext from "./store/LoginContext";
import LoginPage from "./pages/LoginPage";
// import { Switch } from "@headlessui/react";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import MovieLand from "./pages/MovieLand";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const loginInfo = useState({
    isloggedIn: false,
    token: ""
  });
  const [loginObj] = useContext(LoginContext);

  return (
    <div>
      <LoginContext.Provider value={loginInfo}>
        <Router>
          <NavBar />

          <Switch>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/trending">
              <Trending />
            </Route>
            <Route path="/movies">
              <MovieLand />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="*">
              <ErrorPage />
            </Route>
          </Switch>
        </Router>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
