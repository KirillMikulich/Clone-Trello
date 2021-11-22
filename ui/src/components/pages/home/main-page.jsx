import React from "react";
import Header from "./header/header";
import { useSelector } from 'react-redux';

import { useDispatch } from "react-redux";
import { setUser } from '../../../store/actions/user';

import auth from '../../../service/auth';

import './main-page.scss';

export default function MainPage(){
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  React.useEffect(() =>  {
    checkLogIn();
  }, [ ]);

  async function checkLogIn() {
    if(localStorage.getItem('token')) {
      const user = await auth.checkUser();
      if(user) {
        dispatch(setUser(user));
      }
    }
  }

  return(
    <div>
      <Header user={user}></Header>
    </div>
  );
}