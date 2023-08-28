import { Routes, Route } from "react-router-dom";
import { AllCountries, CountryInfo } from "./Component/index";
import "./App.css";
import { useState, useRef, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const useMediaQuery = (query) => {
  const mediaQuery = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaQuery.matches);

  useEffect(() => {
    const listener = (e) => {
      setMatches(e.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, [mediaQuery]);

  return matches;
};

const App = () => {
  const isDarkModePreferred = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useState(isDarkModePreferred);
  const bodyRef = useRef(document.body);

  const toggleDark = () => {
    setIsDark((prevState) => !prevState);
  };

  useEffect(() => {
    if (isDark) {
      bodyRef.current.classList.add("dark");
    } else {
      bodyRef.current.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className={`App ${isDark ? "dark" : "light"}`}>
      <header className={`header main-heading`}>
        <h5>Where in the World</h5>
        <button className="toggler" onClick={toggleDark}>{isDark ? <FaMoon /> : <FaSun />}</button>
      </header>
      <div className={`container`}>
        <Routes>
          <Route index path="/" element={<AllCountries />} />
          <Route path="/country/:countryName" element={<CountryInfo />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
