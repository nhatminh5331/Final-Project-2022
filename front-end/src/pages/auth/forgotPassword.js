import React, {useState} from 'react';
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import {forgotPassword} from "../../redux/actions/authAction"

const ForgotPassword = () => {

    const dispatch = useDispatch()

    const initialState = {email: ''}
    const [data, setData] = useState(initialState)
    const {email} = data

    const handleChangeInput = (event) => {
        const {name, value} = event.target
        setData({...data, [name]:value})
    }

    const forgotSubmit = (event) => {
        event.preventDefault();
        dispatch(forgotPassword(data))
    }

  return (
    <div className="forgot_pw">
        <form onSubmit={forgotSubmit}>
        <h2 className="text-uppercase text-center mb-4 font-weight-bold">Quên mật khẩu ?</h2>

        <div className="form-group mb-5 font-weight-bold">
            <label htmlFor="exampleInputEmail1" >Vui lòng nhập email</label>
            <input type="email" className="form-control" name="email" id="exampleInputEmail1"
            aria-describedby="emailHelp" value={email} onChange={handleChangeInput} />

            <p className="mt-2 font-weight-bold">
                <Link to="/">Đăng nhập !</Link>
            </p>
        </div>

        <button type="submit" className="btn btn-dark w-100 pt-3 pb-3 font-weight-bold" >
            Xác nhận
        </button> 
        
        </form>
    </div>
    )
};

export default ForgotPassword
