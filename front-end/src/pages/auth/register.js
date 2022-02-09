import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useHistory, Link} from 'react-router-dom'
import { register } from '../../redux/actions/authAction'

const Register = () => {
    const {authReducer, notifyReducer} = useSelector(state => state)
    const history = useHistory()
    const dispatch = useDispatch()

    const [userInput, setUserInput] = useState({ fullname: "",username: "", email: "", password: "", confirmpassword: "" });
    const { fullname, username, email, password, confirmpassword } = userInput;
    const [showPass, setShowPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)

    useEffect(() => {
        if(authReducer.token) history.push("/")
    },[authReducer.token, history])

    const handleChangeInput = (event) => {
      setUserInput({...userInput, [event.target.name]: event.target.value})
  }

    const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(register(userInput))
}

    return (
    //Bootstrap 4.5 form
    <div className="auth_page">
        <form onSubmit={handleSubmit}>
            <h2 className="text-uppercase text-center font-weight-bold">Đăng ký</h2>
            <p className="text-center mb-2">
              Let's do it !
            </p>

            <div className="form-group mb-2 font-weight-bold">
              <label htmlFor="fullname">Họ và tên</label>
              <input type="text" className="form-control" id="fullname" 
               onChange={handleChangeInput} value={fullname} name="fullname"
               style={{background: `${notifyReducer.fullname ? '#bdc3c7' : ''}`}}/>

               <small className="form-text text-danger">
                    {notifyReducer.fullname ? notifyReducer.fullname : ''}
               </small>
            </div>

            <div className="form-group mb-2 font-weight-bold">
              <label htmlFor="username">Tên người dùng</label>
              <input type="text" className="form-control" id="username" 
               onChange={handleChangeInput} value={username.toLowerCase().replace(/ /g, "")} name="username"
               style={{background: `${notifyReducer.username ? '#bdc3c7' : ''}`}}/>

               <small className="form-text text-danger">
                    {notifyReducer.username ? notifyReducer.username : ''}
               </small>
            </div>

            <div className="form-group mb-2 font-weight-bold">
              <label htmlFor="exampleInputEmail">Email</label>
              <input type="email" className="form-control" id="exampleInputEmail" 
               onChange={handleChangeInput} value={email} name="email"
               style={{background: `${notifyReducer.email ? '#bdc3c7' : ''}`}}/>

               <small className="form-text text-danger">
                    {notifyReducer.email ? notifyReducer.email : ''}
               </small>
            </div>

            <div className="form-group mb-2 font-weight-bold">
              <label htmlFor="exampleInputPassword1">Mật khẩu</label>
              <div className="showpass">
                  <input type={ showPass ? "text" : "password" } className="form-control" id="exampleInputPassword1" 
                  onChange={handleChangeInput} value={password} name="password"
                  style={{background: `${notifyReducer.password ? '#bdc3c7' : ''}`}}/>
                  <small onClick= {() => setShowPass(!showPass)}>
                      { showPass ? <box-icon name='hide' type='solid' ></box-icon> : <box-icon name='show' type='solid' ></box-icon> }
                  </small>
              </div>

              <small className="form-text text-danger">
                    {notifyReducer.password ? notifyReducer.password : ''}
               </small>
            </div>

            <div className="form-group mb-4 font-weight-bold">
              <label htmlFor="confirmpassword">Xác nhận mật khẩu</label>
              <div className="showpass">
                  <input type={ showConfirmPass ? "text" : "password" } className="form-control" id="confirmpassword" 
                  onChange={handleChangeInput} value={confirmpassword} name="confirmpassword"
                  style={{background: `${notifyReducer.confirmpassword ? '#bdc3c7' : ''}`}}/>
                  <small onClick= {() => setShowConfirmPass(!showConfirmPass)}>
                      { showConfirmPass ? <box-icon name='hide' type='solid' ></box-icon> : <box-icon name='show' type='solid' ></box-icon> }
                  </small>
              </div>

              <small className="form-text text-danger">
                    {notifyReducer.confirmpassword ? notifyReducer.confirmpassword : ''}
              </small>
            </div>

            <button type="submit" className="btn btn-dark w-100 pt-3 pb-3 font-weight-bold" >
              Đăng ký
            </button>

            <p className="text-center mt-3 font-weight-bold">
              Bạn đã có tài khoản ? <Link to="/">Đăng nhập thôi !</Link>
            </p>
        </form>
    </div>
  );
}

export default Register
