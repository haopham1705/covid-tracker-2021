 
import './App.scss';
import AuthRoute from './HOCs/AuthRoute'
import PrivateRoute from './HOCs/PrivateRoute'
import NotFound from './components/NotFound'
import HomePage from 'pages/HomePage'
import LogInPage from 'pages/LogInPage'
import ChartPage from 'pages/ChartPage'
import News from 'components/News'
import GlobalLoading from './components/GlobalLoading' 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header';
import {checkLoggedIn} from 'HOCs/checkLoggedIn'


function App() {
  // const loggedInUser = useSelector((state) => state.user.isloggedin)
  const loggedInUser = checkLoggedIn;
  const isLoggedIn = loggedInUser;
  return (
    <div className="app">
      <Router>
        <Header isLoggedIn={isLoggedIn} />
        <GlobalLoading />
        {/* <News />  */}
        <Switch>
          {/* <AuthRoute path="/signin" component={LogInPage} />
          <PrivateRoute path="/overview" component={HomePage} /> */}
          <Route exact path="/" component={News} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
