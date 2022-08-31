import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import LanguageSelector from "./components/LanguageSelector";
import { useTranslation } from "react-i18next";

import { Routes, Route, Link } from "react-router-dom";
// @ts-ignore
import logo from "./assets/hoaxify.png";

function App() {
  const { t } = useTranslation();

  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-light shadow-sm">
        <div className="container">
          <Link className="navbar-brand" to="/" title="Home">
            <img src={logo} alt="Hoaxify" width={60} />
            Hoaxify
          </Link>
          <ul className="navbar-nav">
            <Link className="nav-link" to="/signup" title="Sign Up">
              {t("signUp")}
            </Link>
            <Link className="nav-link" to="/login" title="Login">
              {t("login")}
            </Link>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
      <LanguageSelector />
    </>
  );
}

export default App;
