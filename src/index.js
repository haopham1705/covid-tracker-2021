import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './redux/store'
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals'; 

import i18n from 'translation/i18n';
import { I18nextProvider } from 'react-i18next';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}> 
          <App />  
      </I18nextProvider>
    </Provider>
  </React.StrictMode>,
  
  document.getElementById('root')
);

reportWebVitals();
