import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Router
import { BrowserRouter, Route } from 'react-router-dom';

// Store
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
