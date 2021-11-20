import $api, { API_URL } from '../http';
import axios from 'axios';

const AuthService = {
  login(email, password){
    return $api.post('/login', { email, password }).then(res => res.data);
  },
  register(email, password){
    return $api.post('/registration', { email, password }).then(res => res.data);
  },
  logout(){
    return $api.post('/logout');
  },
  checkUser(){
    return axios.get(`${API_URL}/refresh`, { withCredentials: true }).then( res => {
      localStorage.setItem('token', res.data.accessToken);
      return res.data.user;
    });
  }
};

export default  AuthService;