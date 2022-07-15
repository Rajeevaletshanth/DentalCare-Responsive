import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CookiesProvider } from "react-cookie";

//Redux
import { Provider } from 'react-redux';
import store from './Redux/store';

import "./Translation/i18next";

ReactDOM.render( 
  // <React.StrictMode>
  <CookiesProvider>
    <Suspense fallback={<div class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>}>
      <Provider store={store} >
        <App />
      </Provider>
    </Suspense>
  </CookiesProvider>,
  document.getElementById('root')
);
