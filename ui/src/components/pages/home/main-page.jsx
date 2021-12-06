import React from "react";
import Header from "./header/header";
import { useSelector } from 'react-redux';

import { useDispatch } from "react-redux";
import { setUser } from '../../../store/actions/user';

import auth from '../../../service/auth';

import './main-page.scss';
import SideMenu from "./side-menu/side-menu";
import Board from "./board/board";

export default function MainPage(){
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const boardId = useSelector((state) => state.boardId);

  React.useEffect(() =>  {
    checkLogIn();
  }, []);

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
      <div className="page-container">
        <SideMenu></SideMenu>
        {
            boardId && <Board></Board>
        }
      </div>
    </div>
  );
}
