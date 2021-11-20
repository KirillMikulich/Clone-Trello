const tokenService = require("../service/token-service");

module.exports = function (res, req, next) {
  try {
    const auth = req.headers.authorization;
    if(!auth){
      return req.status(401).send({
        error: true,
        data: {
          message: 'Unauthorize'
        }});
    }

    const accessToken = auth.split(' ')[1];
    
    if(accessToken){
      return req.status(401).send({
        error: true,
        data: {
          message: 'Unauthorize'
        }});
    }

    const userData = tokenService.validateAccessToken(accessToken);

    if(userData){
      return req.status(401).send({
        error: true,
        data: {
          message: 'Unauthorize'
        }});
    }
    req.user = userData;
    next();
  }
  catch(error) {
    return req.status(401).send({
      error: true,
      data: {
        message: 'Unauthorize'
      }});
  }
};