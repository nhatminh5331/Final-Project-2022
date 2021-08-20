import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const { email, password } = userInput;

  const handleChangeInput = (event) => {
      setUserInput({...userInput, [event.target.name]: event.target.value})
  }

  return (
    //Bootstrap4.5 form
    <div className="auth_page">
        <form>
            <h2 className="text-uppercase">Tiny Social</h2>

            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input type="email" className="form-control" id="exampleInputEmail1" 
              aria-describedby="emailHelp" onChange={handleChangeInput} value={email} name="email"/>
              <small id="emailHelp" className="form-text text-muted">Bấm tài khoản coi chừng mấy đứa xung quanh nhìn :D</small>
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" 
              onChange={handleChangeInput} value={password} name="password"/>
            </div>

            <button type="submit" className="btn btn-dark w-100">
              Đăng nhập
            </button>

            <p>
              Bạn đang cô đơn và không có tài khoản ? <Link to="/register">Đăng ký ngay</Link>
            </p>
        </form>
    </div>
  );
};

export default Login;
