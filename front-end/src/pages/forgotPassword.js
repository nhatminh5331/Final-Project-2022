import React, {useState} from 'react';
import {postDataAPI}from '../utils/fetchData'
import { Link } from "react-router-dom";

const initialState = {
    email: '',
}

const ForgotPassword = () => {
    const [data, setData] = useState(initialState)

    const {email} = data

    const handleChangeInput = (event) => {
        const {name, value} = event.target
        setData({...data, [name]:value})
    }

    const forgotPassword = async () => {
            
        try {
            const res = await postDataAPI('forgot', {email})
            return setData({...data, res})
        } catch (err) {
            return err
        }
    }

  return (
    <div className="forgot_pw">
        <form>
        <h2 className="text-uppercase text-center mb-2 font-weight-bold">Quên mật khẩu ?</h2>

        <div className="form-group mb-4 font-weight-bold">
            <label htmlFor="exampleInputEmail1" >Vui lòng nhập địa chỉ email</label>
            <input type="email" className="form-control" name="email" id="exampleInputEmail1"
            aria-describedby="emailHelp" value={email} onChange={handleChangeInput} />

            <Link to="/">Đăng nhập !</Link>
        </div>

        <button onClick={forgotPassword} className="btn btn-dark w-100 pt-3 pb-3 font-weight-bold" >
            Xác nhận email 
        </button> 
        
        </form>
    </div>
    )
};

export default ForgotPassword;
