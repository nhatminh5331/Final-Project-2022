import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {postDataAPI}from '../../utils/fetchData'


function ActivationEmail() {
    const {activation_token} = useParams()

    useEffect(() => {
        if(activation_token){
            const activationEmail = async () => {
                try {
                    const res = await postDataAPI('activation', {activation_token})
                    return res
                } catch (err) {
                    return err
                }
            }
            activationEmail()
        }
    },[activation_token])

    return (
        <div className="active_page">
            <form>
            <h2 className="text-uppercase text-center mb-3 font-weight-bold">Chúc mừng</h2>
            <h3 className="text-uppercase text-center mb-2 font-weight-bold">Tài khoản đã kích hoạt thành công !</h3>
            </form>
        </div>
    )
}

export default ActivationEmail