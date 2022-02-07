import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'

const ResetPassword = () => {

    const initialState = {password: '', confirmpassword: ''}
    const [data, setData] = useState(initialState)
    const {password, confirmpassword} = data

    const {token} = useParams()

    const handleChangeInput = (event) => {
        const {name, value} = event.target
        setData({...data, [name]:value})
    }

    const handleResetPass = async () => {

        try {
            const res = await axios.post('/api/reset', {password}, {
                headers: {Authorization: token}
            })
            // Không thể sử dụng postDataAPI

            return setData({...data, res})

        } catch (err) {
            return err
        }
        
    }

  return (
        <div className="reset_pw">
            <form>
                <h2 className="text-uppercase text-center mb-2 font-weight-bold">Thay đổi mật khẩu</h2>

            <div className="form-group mb-4 font-weight-bold">
                <label htmlFor="exampleInputPassword1" >Mật khẩu</label>
                <input type="password" className="form-control" name="password" id="exampleInputPassword1"
                 value={password} onChange={handleChangeInput} />
            </div>

            <div className="form-group mb-5 font-weight-bold">
                <label htmlFor="confirmpassword" >Xác nhận mật khẩu</label>
                <input type="password" className="form-control" name="confirmpassword" id="confirmpassword"
                 value={confirmpassword} onChange={handleChangeInput} />
            </div>

                <button onClick={handleResetPass} className="btn btn-dark w-100 pt-3 pb-3 mb-3 font-weight-bold" >
                    Xác nhận
                </button> 
            
            </form>
        </div>
  )
};

export default ResetPassword;
