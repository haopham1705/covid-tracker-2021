
import NotFound from 'components/NotFound';
import HomePage from 'pages/HomePage';
import PublicPage from 'pages/PublicPage';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import GlobalLoading from './components/GlobalLoading';
import AuthRoute from './HOCs/AuthRoute';
import PrivateRoute from './HOCs/PrivateRoute';

import { useState, useMemo, useEffect } from 'react';

import { lightTheme, darkTheme } from './theme';
import { createTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import ThemeContext from 'context/Context';


function App() {
  const [isDark, setIsDark] = useState(false);
  const toggleDarkMode = () => {
    if (isDark) {
      localStorage.setItem("preferred-theme", "light")
      setIsDark(false)
    } else {
      localStorage.setItem("preferred-theme", "dark")
      setIsDark(true)
    }
  }

  const memoizedTheme =
    useMemo(() => {
      if (isDark) {
        return createTheme({
          ...darkTheme
        });
      }
      return createTheme({
        ...lightTheme
      });
    }, [isDark]);

  useEffect(() => {
    const theme = localStorage.getItem("preferred-theme")
    if (theme) {
      const themePreference = localStorage.getItem("preferred-theme")
      if (themePreference === "dark") {
        setIsDark(true)
      } else {
        setIsDark(false)
      }
    } else {
      localStorage.setItem("preferred-theme", "light")
      setIsDark(true)
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleDarkMode }}>
      <CssBaseline />
      <ThemeProvider theme={memoizedTheme}>
        <div className="app">
          <GlobalLoading />
          <Switch>
            <AuthRoute path="/public" component={PublicPage} />
            <PrivateRoute path="/" component={HomePage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </ThemeProvider>
    </ThemeContext.Provider >

  );
}

export default App;
