import React from "react";
import { useSelector } from "react-redux";

import Login from "../authintificate/login";

export default function MainPage() {
  const user = useSelector(({user}) => user);
  
  return(
    <>
      {
        user && <div>Auth</div>
      }
      {
        !user && <Login/>
      }
    </>);
};