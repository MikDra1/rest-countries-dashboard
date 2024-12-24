import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Country from "./pages/Country";

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import { useCountryRest } from "./contexts/CountryRestProvider";
import { useData } from "./contexts/DataContext";
import Spinner from "./ui/Spinner";
import GlobalStyle from "./styles/GlobalStyle";

function App() {
  const { theme } = useCountryRest();
  const { isLoading } = useData();

  if (isLoading) return <Spinner />;

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/:alpha3Code" element={<Country />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
