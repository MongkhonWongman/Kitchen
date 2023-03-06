import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist'
import {store} from './Redux-store/Store';

import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import {router} from './Router/Router';
import "./font/Google-font.css";
import "bootstrap/dist/css/bootstrap.css";

import "rsuite/dist/rsuite.min.css";

let persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        </PersistGate>
      </Provider>
  </ React.StrictMode>
);

