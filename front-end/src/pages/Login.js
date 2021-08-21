import React, { useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const { email, password } = userInput;

  const [showPass, setShowPass] = useState(false)


  const handleChangeInput = (event) => {
      setUserInput({...userInput, [event.target.name]: event.target.value})
  }

  return (
    //Bootstrap4.5 form
    <div className="auth_page">
        <form>
            <h2 className="text-uppercase text-center mb-4 font-weight-bold">Tiny Social</h2>

            <div className="form-group font-weight-bold">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input type="email" className="form-control" id="exampleInputEmail1" 
              aria-describedby="emailHelp" onChange={handleChangeInput} value={email} name="email"/>
              <small id="emailHelp" className="form-text text-muted">Bấm mật khẩu coi chừng mấy đứa xung quanh nhìn :D</small>
            </div>

            <div className="form-group mb-4 font-weight-bold">
              <label htmlFor="exampleInputPassword1">Password</label>
              <div className="showpass">
                  <input type={ showPass ? "text" : "password" } className="form-control" id="exampleInputPassword1" 
                  onChange={handleChangeInput} value={password} name="password"/>
                  <small onClick= {() => setShowPass(!showPass)}>
                      { showPass ? "Hide" : "Show" }
                  </small>
              </div>
            </div>

            <button type="submit" className="btn btn-dark w-100 pt-3 pb-3" >
              Đăng nhập
            </button>

            <p className="text-center mt-4 font-weight-bold">
              Bạn đang cô đơn ? <Link to="/register">Đăng ký ngay</Link>
            </p>
        </form>
    </div>
  );
};

export default Login;
