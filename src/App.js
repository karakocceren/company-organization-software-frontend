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

function App() {
  return (
    <>
      <LanguageSelector />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/activate-account" element={<ActivateAccount />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
