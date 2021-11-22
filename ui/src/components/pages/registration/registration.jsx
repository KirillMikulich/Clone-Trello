import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import auth from '../../../service/auth';
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setUser } from '../../../store/actions/user';

import './registration.scss';

export default function Registration() {

  const [isShowPassword, setIsShowPassword] = React.useState(false);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [ident, setIdent] = React.useState('');

  const dispatch = useDispatch();
  let navigate = useNavigate();

  async function register() {
    try{
      const response = await auth.register(email, password, ident);
      if(response){
        localStorage.setItem('token', response.accessToken);
        dispatch(setUser(response.user));
        navigate("/main-page", { replace: true });
      }
    }
    catch(err){
      alert("Проверьте email или идентификатор");
    }
  }

  return(
    <div>
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
        <div className="row">
          <div className="label">Идентификатор</div>
          <input className="input-textarea" type="text" onChange={ e => setIdent(e.target.value) }  value={ident} />
        </div>
        <div className="m5 button blue-button" onClick={register}>Зарегистрироваться</div>
      </div>
    </div>
    </div>
  );
};