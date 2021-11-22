import React from "react";
import auth from '../../../../service/auth';

import { useNavigate } from "react-router-dom";

import './header.scss';

export default function Header({user}){
  const userData = {...user?.user};

  let navigate = useNavigate();

  async function logout(){
    await auth.logout();
    localStorage.removeItem('token');
    navigate("/", { replace: true });
  }

  return(
    <div className="header">
      <div className="header-container">
        <div className="name-user mr10">Идентификатор: {userData.ident}</div>  
        <div className="name-email mr10">Email: {userData.email}</div>  
        <div className="button blue-button" onClick={logout}>Выход</div>
      </div>
    </div>
  );
}