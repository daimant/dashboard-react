import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import AppContainer from './AppContainer';
import store from './Components/Redux/store';
import {Provider} from 'react-redux';
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppContainer/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(); // google analise your veb
