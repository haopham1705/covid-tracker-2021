import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import i18n from 'translation/i18n';
import App from './App';
import './index.css';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';



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
