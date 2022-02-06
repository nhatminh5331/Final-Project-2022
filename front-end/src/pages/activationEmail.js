import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {postDataAPI}from '../utils/fetchData'


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
            <h2 className="text-uppercase text-center mb-2 font-weight-bold">Chúc mừng bạn đã kích hoạt tài khoản thành công !</h2>
        </div>
    )
}

export default ActivationEmail