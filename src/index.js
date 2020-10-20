import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'easy-peasy';
import { BrowserRouter } from 'react-router-dom';

import './styles/tailwind.output.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import store from './models/store';

// ReactDOM.render(
//   <React.StrictMode>
//     <StoreProvider store={store}>
//       <App />
//     </StoreProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// Implementing redux state persistance in HMR hot reloading
const render = Component => {
  return ReactDOM.render(
    <StoreProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>,
    document.getElementById('root')
  )
}

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
