import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import auth from '../../../service/auth';

import './login.scss';

export default function Login() {

  const [isShowPassword, setIsShowPassword] = React.useState(false);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function login() {
    const response = await auth.login(email, password);
    localStorage.setItem('token', response.accessToken);
  }

  return (
    <div className="auth-form">
      <div className="auth-form__container">
        <div className="text">Войдите, что бы перейти дальше</div>
        <div className="row">
          <dev className="label">Email</dev>
          <input className="input-textarea" type="text" onChange={ e => setEmail(e.target.value) }  value={email} />
        </div>
        <div className="row">
          <div className="label">Пароль</div>
          <input className="input-textarea" type={isShowPassword ? 'text' : 'password'} 
                  onChange={ e => setPassword(e.target.value) }  value={password}/>
          <FontAwesomeIcon className="show-ico" 
                            icon={isShowPassword ? faEyeSlash : faEye} 
                            onClick={() => setIsShowPassword(!isShowPassword)} />
        </div>
        <div className="m5 button blue-button" onClick={login}>Войти</div>
        <div className="m5 button blue-button ">Регистрация</div>
      </div>
    </div>
  );
}