import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LanguageSelector from "./components/LanguageSelector";

function App() {
  return (
    <div className="container">
      <HomePage />
      <SignUpPage />
      <LanguageSelector />
    </div>
  );
}

export default App;
