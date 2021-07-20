
import NotFound from 'components/NotFound';
import HomePage from 'pages/HomePage';
import PublicPage from 'pages/PublicPage';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import GlobalLoading from './components/GlobalLoading';
import AuthRoute from './HOCs/AuthRoute';
import PrivateRoute from './HOCs/PrivateRoute';


function App() {

  return (
    <div className="app">
      <GlobalLoading />
      <Switch>
        <AuthRoute path="/public" component={PublicPage} />
        <PrivateRoute path="/" component={HomePage} /> 
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
