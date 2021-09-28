import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Web3Provider from 'web3-react'
import { connectors } from './utils/connectors';
import Web3 from 'web3';

ReactDOM.render(
  <Provider store={store}>
    <Web3Provider
      connectors={connectors}
      libraryName={'web3.js'}
      web3Api={Web3}
    > 
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Web3Provider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
