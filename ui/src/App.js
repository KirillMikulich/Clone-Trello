import React from "react";
import AuthForm from "./components/auth-form";
import AuthService from "./service/auth";

function App() {

  React.useEffect(() =>  {
    checkLogIn();
  }, []);

  async function checkLogIn() {
    if(localStorage.getItem('token')){
      const user = await AuthService.checkUser();
    }
  }
  
  return (
    <div>
      <AuthForm />
    </div>
  );
}

export default App;
