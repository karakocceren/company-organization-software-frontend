import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ActivateAccount from "./pages/activateAccount/ActivateAccount";
import LanguageSelector from "./components/LanguageSelector";
import { StyledEngineProvider } from "@mui/material/styles";

function App() {
  return (
    <>
      <LanguageSelector />
      <StyledEngineProvider injectFirst>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate replace to="/signin" />} />
            <Route path="/signin" element={<Login />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route
              path="/activate-account"
              element={<ActivateAccount />}
            ></Route>
          </Routes>
        </Router>
      </StyledEngineProvider>
    </>
  );
}

export default App;
