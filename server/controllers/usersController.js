const User = require("../model/userModel");
const bcrypt = require("bcrypt");//用于加密密码；



module.exports.register =async (req,res,next)=>{
  try{
    const { username, email, password}=req.body;
  const usernameCheck = await User.findOne({username});
  if(usernameCheck)
    return res.json({msg: "该用户名已被使用",status: false});
  const emailCheck = await User.findOne({email});
  if(emailCheck)
    return res.json({msg:"该邮箱已被注册",status:false});
  const hashedPassword = await bcrypt.hash(password, 10 );//10指的是加密类型
  const user = await User.create({
    email,
    username,
    password:hashedPassword,
  });
  delete user.password;
  return res.json({status: true, user});
  } catch (ex){
    next(ex);
  }
}

module.exports.login =async (req,res,next)=>{
  try{
    const { username, password}=req.body;
  const user = await User.findOne({username});
  if(!user)
    return res.json({msg: "用户名或密码不正确",status: false});
  const isPasswordValid = await bcrypt.compare(password,user.password);
  if(!isPasswordValid)
    return res.json({msg: "用户名或密码不正确",status: false});
  delete user.password;
  return res.json({status: true, user});
  } catch (ex){
    next(ex);
  }
}