import React from "react";
import AuthService from "./service/auth";
import { useDispatch } from "react-redux";
import { setUser } from './store/actions/user';

import MainPage from "./components/pages/home";
import './index.scss';

function App() {

  const dispatch = useDispatch();

  React.useEffect(() =>  {
    checkLogIn();
  }, []);

  async function checkLogIn() {
    if(localStorage.getItem('token')) {
      const user = await AuthService.checkUser();
      if(user) {
        dispatch(setUser(user));
      }
    }
  }
  
  return <MainPage />;
}

export default App;
