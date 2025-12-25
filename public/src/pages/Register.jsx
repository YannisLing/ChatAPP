import React ,{useState, useEffect} from "react";
import { Link ,useNavigate} from "react-router-dom";
import styled from "styled-components"
import Logo from "../assets/logo.svg"
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { registerRoute } from "../utils/APIRoutes"

function Register() {
  const navigate = useNavigate();
  const [values,setValues]=useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
  })
  const toastOptions={
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
      }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()){
      console.log("in validation",registerRoute)
      const {password,username,email}=values;
      const {data} = await axios.post(registerRoute,{
        username,
        email,
        password,
      });
      if(data.status===false){
        toast.error(data.msg,toastOptions);
      }
      if(data.status === true){
        localStorage.setItem('chat-app-user',JSON.stringify(data.user));
        navigate("/");//将页面导航到聊天页面；
      }
    };//提交后验证表单,验证通过调用api    
  };
  
  const handleValidation = () =>{
    const {password, confirmPassword,username,email}=values;//解构values
    if(password!==confirmPassword){//密码不一致抛出提示
      toast.error("密码和确认密码应该一致",toastOptions);
      return false;
    }else if(username.length<2){
      toast.error("用户名长度应该不小于2",toastOptions);
      return false;
    }else if(password.length<8){
      toast.error("密码长度应该不小于8",toastOptions);
      return false;
    }else if(email===""){
      toast.error("电子邮件地址是必须的",toastOptions);
      return false;
    }
    return true;
  };
  const handleChange = (event) => {
    setValues({...values,[event.target.name]:event.target.value})
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event)=>handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />{/*应用的图标*/}
            <h1>YanniChat</h1>
          </div>

          <input type="text" placeholder="用户名" name="username" onChange={e=>handleChange(e)} />
          <input type="email" placeholder="邮件" name="email" onChange={e=>handleChange(e)} />
          <input type="password" placeholder="密码" name="password" onChange={e=>handleChange(e)} />
          <input type="password" placeholder="确认密码" name="confirmPassword" onChange={e=>handleChange(e)} />
          <button type="submit">创建用户</button>
          <span>已经有一个账号 ?点这里 <Link to="/login">登录</Link></span>
        </form>
      </FormContainer>
      <ToastContainer/>
    </>
  );

}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #309db1ff;
      text-decoration: none;
      font-weight: bold;
    }
  }    
`;

export default Register;
