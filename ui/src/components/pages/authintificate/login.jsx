import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { useDispatch } from "react-redux";
import { setUser } from '../../../store/actions/user';
import auth from '../../../service/auth';
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import './login.scss';

export default function Login() {

  const [isShowPassword, setIsShowPassword] = React.useState(false);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const dispatch = useDispatch();
  let navigate = useNavigate();

  React.useEffect(() =>  {
    checkLogIn();
  }, [ ]);

  async function checkLogIn() {
    if(localStorage.getItem('token')) {
      const user = await auth.checkUser();
      if(user) {
        dispatch(setUser(user));
        navigate("/main-page", { replace: true });
      }
    }
  }

  async function login() {
    try{
      const response = await auth.login(email, password);
      localStorage.setItem('token', response.accessToken);
      dispatch(setUser(response.user));
      navigate("/main-page", { replace: true });
    }
    catch(err){
      alert("Проверьте данные. Возможно пользователь не зарегистрирован.");
    }
  }

  return (
    <div className="auth-form">
      <div className="auth-form__container">
        <div className="text">Войдите, что бы перейти дальше</div>
        <div className="row">
          <div className="label">Email</div>
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
        <div className="m5 button blue-button"><Link to="/registration">Регистрация</Link></div>
      </div>
    </div>
  );
}