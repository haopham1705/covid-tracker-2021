
import './App.scss';
import AuthRoute from './HOCs/AuthRoute'
import PrivateRoute from './HOCs/PrivateRoute'
import NotFound from 'components/NotFound'
import Trackers from 'components/Trackers'
import HomePage from 'pages/HomePage'
import PublicPage from 'pages/PublicPage'
import LogInPage from 'pages/LogInPage'
import News from 'components/News'
import GlobalLoading from './components/GlobalLoading'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header';
import { checkLoggedIn } from 'HOCs/checkLoggedIn'


function App() {

  return (
    <div className="app">
      <GlobalLoading />
      <Switch>
        <AuthRoute path="/public" component={PublicPage} />
        <PrivateRoute path="/" component={HomePage} />
        {/* <PrivateRoute path="/news" component={News} />
        <PrivateRoute path="/trackers" component={Trackers} /> */}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
