import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Provider } from 'react-redux';
import Registration from './components/pages/registration/registration';
import store from './store/index';
import MainPage from './components/pages/home/main-page';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/main-page" element={<MainPage/>} />
      </Routes>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
