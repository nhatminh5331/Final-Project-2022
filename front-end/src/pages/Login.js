import React, { useState } from "react";
import 'boxicons'
import { Link } from "react-router-dom";
import { login } from '../redux/actions/authAction'
import { useDispatch } from "react-redux";


const Login = () => {
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const { email, password } = userInput;
  const [showPass, setShowPass] = useState(false)

  const dispatch = useDispatch()

  const handleChangeInput = (event) => {
      setUserInput({...userInput, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(userInput))
}

  return (
    //Bootstrap 4.5 form
    <div className="auth_page">
        <form onSubmit={handleSubmit}>
            <h2 className="text-uppercase text-center mb-2 font-weight-bold">Novarea</h2>
            <p className="text-center mb-2">
              Kết nối những đam mê !
            </p>

            <div className="form-group mb-4 font-weight-bold">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input type="email" className="form-control" id="exampleInputEmail1" 
              aria-describedby="emailHelp" onChange={handleChangeInput} value={email} name="email"/>
            </div>

            <div className="form-group mb-5 font-weight-bold">
              <label htmlFor="exampleInputPassword1">Mật khẩu</label>
              <div className="showpass">
                  <input type={ showPass ? "text" : "password" } className="form-control" id="exampleInputPassword1" 
                  onChange={handleChangeInput} value={password} name="password"/>
                  <small onClick= {() => setShowPass(!showPass)}>
                      { showPass ? <box-icon name='hide' type='solid' ></box-icon> : <box-icon name='show' type='solid' ></box-icon> }
                  </small>
              </div>
            </div>
            
            <div className="login">
            <button type="submit" className="btn btn-dark w-100 pt-3 pb-3 font-weight-bold" >
             Đăng nhập 
            </button> 
            <small>
            <box-icon name='log-in' color='white'  ></box-icon>
            </small>
            </div>

            <p className="text-center mt-4 font-weight-bold">
              Bạn chưa có tài khoản ? <Link to="/register">Đăng ký ngay !</Link>
            </p>
        </form>
    </div>
  );
};

export default Login;
