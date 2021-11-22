import $api, { API_URL } from '../http';
import axios from 'axios';

const AuthService = {
  login(email, password){
    return $api.post('/user/login', { email, password }).then(res => res.data);
  },
  register(email, password, ident){
    return $api.post('/user/registration', { email, password, ident }).then(res => res.data);
  },
  logout(){
    return $api.post('/user/logout');
  },
  checkUser(){
    return axios.get(`${API_URL}/user/refresh`, { withCredentials: true }).then( res => {
      localStorage.setItem('token', res.data.accessToken);
      return res.data.user;
    });
  }
};

export default  AuthService;