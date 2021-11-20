import React from 'react';
import auth from '../service/auth';

export default function AuthForm(){
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isAuth, setIsAuth] = React.useState(false);
  const [userData, setUserData] = React.useState(null);

  async function login() {
    const response = await auth.login(email, password);
    console.log(response);
    localStorage.setItem('token', response.accessToken);
    setIsAuth(true);
    setUserData(response.user);
  }

  async function registration() {
    const response = await auth.register(email, password);
    console.log(response);
    localStorage.setItem('token', response.accessToken);
    setIsAuth(true);
    setUserData(response.user);
  }
  async function logout() {
    const response = await auth.logout(email, password);
    console.log(response);
    localStorage.removeItem('token');
    setIsAuth(false);
    setUserData(null);
  }

  return (
    <div>
      Email: <input onChange={ e => setEmail(e.target.value) }  value={email}  type="text" />    
      Password: <input onChange={ e => setPassword(e.target.value) }  value={password}  type="password" />    
      <button onClick={login}>Log in</button>
      <button onClick={registration}>Registration</button>
      <button onClick={logout}>Log out</button>
    </div>
  );
}