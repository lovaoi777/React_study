import React from 'react';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom/client';
import rootReducer from './modules';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {composeWithDevTools} from 'redux-devtools-extension';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = createStore(rootReducer , composeWithDevTools());
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
