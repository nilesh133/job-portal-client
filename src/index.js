import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from "./store"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// https://preview.colorlib.com/#karl
// https://preview.colorlib.com/#fashe
// #111111

// https://preview.colorlib.com/#skillhunt - Home page
// https://preview.colorlib.com/#jobfinderportal - Apply job
// https://preview.colorlib.com/#jobboard - Apply job
// https://preview.colorlib.com/#joblisting - Apply job
