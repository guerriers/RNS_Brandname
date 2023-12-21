/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
// import AuthProvider from './context/authProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
     <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
    </BrowserRouter>
   </PersistGate>
  </Provider>
);

reportWebVitals();
