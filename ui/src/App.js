import React from "react";
import AuthService from "./service/auth";
import { useDispatch } from "react-redux";
import { setUser } from './store/actions/user';

import Login from "./components/pages/authintificate/login";
import './index.scss';
import { Link } from "react-router-dom";

function App() {

  const dispatch = useDispatch();

  React.useEffect(() =>  {
    checkLogIn();
  }, [ ]);

  async function checkLogIn() {
    if(localStorage.getItem('token')) {
      const user = await AuthService.checkUser();
      if(user) {
        dispatch(setUser(user));
      }
    }
  }
  
  return(
  <div>
    <Login></Login>
    {
      localStorage.getItem('token') && <Link to="/main-page"/>
    }
  </div>
  );
}

export default App;
