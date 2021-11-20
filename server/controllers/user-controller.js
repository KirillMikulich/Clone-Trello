const userService = require('../service/user-service');
const { validationResult } = require('express-validator');

module.exports = {
  async registration(req, res) {
    try {
      const errors = validationResult(req);

      if(!errors.isEmpty()){
        return res.json("Некорректные данные");
      }

      const { email, password } = req.body;

      const userData = await userService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30*24*60*60*1000, httpOnly: true });

      return res.json(userData);

    }
    catch (error) {
      res.status(400).send({
        error: true,
        data: {
          message: error.message
        }
      })
    }
  },
  async login(req, res) {
    try {
        const { email, password } = req.body;
        const userData = await userService.login(email,password);
        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30*24*60*60*1000, httpOnly: true });
        return res.json(userData);
    }
    catch (error) {
      res.status(400).send({
        error: true,
        data: {
          message: error.message
        }});
    }
  },
  async logout(req, res){
    try {
      const {refreshToken} = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    }
    catch (error) {
      res.status(400).send({
        error: true,
        data: {
          message: error.message
        }});
    }
  },
  async refresh(req, res){
    try {
      const {refreshToken} = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30*24*60*60*1000, httpOnly: true });
      return res.json(userData);
    }
    catch (error) {
      res.status(400).send({
        error: true,
        data: {
          message: error.message
        }});
    }
  }
};