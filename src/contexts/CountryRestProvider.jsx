/* eslint-disable react/prop-types */
import useScreenSize from "../hooks/useScreenSize";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const CountryRestContext = createContext();

function CountryRestProvider({ children }) {
  const [isMobile, setIsMobile] = useState(null);
  const screenSize = useScreenSize();

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(
    function () {
      setIsMobile(screenSize.width <= 1200);
    },
    [screenSize.width]
  );

  return (
    <CountryRestContext.Provider
      value={{
        isMobile,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </CountryRestContext.Provider>
  );
}

function useCountryRest() {
  const context = useContext(CountryRestContext);
  if (context === undefined)
    throw new Error(
      "CountryRestContext was used outside the CountryRestProvider"
    );
  return context;
}

export { CountryRestProvider, useCountryRest };
