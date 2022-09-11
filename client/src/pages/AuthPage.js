import React,{useContext, useEffect, useState} from "react"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"


export const  AuthPage =()=> {
  const auth =useContext(AuthContext)
  const message = useMessage()
  const {loading,request,error,clearError} = useHttp()
  const [form,setForm] = useState({
    email:"",password : ""
  })

  useEffect(()=>{
    message(error)
    clearError()
  },[error,message,clearError])

  useEffect(()=>{
    window.M.updateTextFields()
  })

  const changeHandler = event =>{
    setForm({...form,[event.target.name]:event.target.value})
  }

  const registerHandler = async() =>{
    try {
      const data = await request('/api/auth/register', 'POST',{...form})
      message(data.message)
    } catch (error) {}
    
  }
  const loginHandler = async()=>{
    try {
      const data = await request('/api/auth/login','POST',{...form})
      auth.login(data.token,data.userId)
    } catch (error) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи ссылку</h1>
        <div className="card blue darken-1">
        <div className="card-content white-text">
          <span className="card-title">Авторизация</span>
          <div>
            <div className="input-field">
              <input placeholder="Введите email"
              id="email" 
              type="text"
              name="email"
              value={form.email}
              className="yelow-input"
              onChange={changeHandler}
              />
               <label htmlFor="email"></label>
            </div>
            <div className="input-field">
              <input placeholder="Введите password"
              id="password" 
              type="password"
              name="password"
              value={form.password}
              className="yelow-input"
              onChange={changeHandler}
              />
               <label htmlFor="password"></label>
            </div>
          </div>
        </div>
        <div className="card-action">
          <button className="btn" 
          style={{marginRight : 10}}
          disabled={loading}
          onClick={loginHandler}
          >
            Войти
          </button>
          <button className="btn"
          onClick={registerHandler}
          disabled={loading}
          >
            Регистрация
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
