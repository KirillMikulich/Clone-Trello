const bcrypt = require('bcrypt');
const models = require('../database/models/index');
const tokenService = require('../service/token-service');

module.exports = {
  async registration(email, password, ident) {
    const candidate = await models.User.findOne({ where: {
      email: email
    }});
    
    if(candidate) {
      throw new Error(`Пользователь с почтовым адресом ${email} уже существует`);
    }

    const identCheck =  await models.User.findOne({ where: {
      ident: ident
    }});

    if(identCheck) {
      throw new Error(`Пользователь с идентификатором ${email} уже существует`);
    }

    const hashPass = await bcrypt.hash(password,3);

    const user = await models.User.create({email, password: hashPass, ident});

    const tokens = tokenService.generateToken({ ...user });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
  },
  async login(email,password){
    const user = await models.User.findOne({where:{email:email}});

    if(!user){
      throw new Error( "Пользователь с таким email не существует");
    }
    const isPassEqual = await bcrypt.compare(password, user.password);

    if(!isPassEqual){
      throw new Error("Пароль не верен");
    }
    const tokens = tokenService.generateToken({...user});
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
  },
  async logout(refreshToken){
    const token = await tokenService.removeToken(refreshToken);
    return token;
  },
  async refresh(refreshToken){
    if(!refreshToken){
      throw new Error("user no auth");
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = tokenService.findTokenDb(refreshToken);
    if(!userData || !tokenFromDb){
      throw new Error("user no auth");
    }
    const user = await models.User.findOne({ where:{id:userData.dataValues.id }});

    const tokens = tokenService.generateToken({...user});
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
  }
};