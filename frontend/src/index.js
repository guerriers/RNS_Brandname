import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
    {/* <AuthProvider> */}
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      {/* </AuthProvider> */}
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
