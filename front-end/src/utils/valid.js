const valid = ({fullname, username, email, password, confirmpassword}) => {
    const err = {}

    if(!fullname) {
        err.fullname = "Họ và tên là bắt buộc !"
    }else if(fullname.length > 30) {
        err.fullname = "Họ và tên không quá 30 kí tự"
    }

    if(!username) {
        err.username = "Tên đăng nhập là bắt buộc !"
    }else if(username.replace(/ /g, "").length > 15) {
        err.username = "Tên đăng nhập không quá 15 kí tự"
    }

    if(!email) {
        err.email = "Email là bắt buộc !"
    }else if(!validateEmail(email)) {
        err.email = "Email định dạng không chính xác"
    }

    if(!password) {
        err.password = "Mật khẩu là bắt buộc !"
    }else if(password.length < 6) {
        err.password = "Mật khẩu phải có ít nhất 6 kí tự"
    }

    if(confirmpassword !== password) {
        err.confirmpassword = "Xác nhận mật khẩu chưa chính xác !"
    }
    return{
        errMsg: err,
        errLength: Object.keys(err).length
    }
}

function validateEmail(email){ 
    //eslint-disable-next-line 
    var re = /^(([^<>()[]\\.,;:\s@\"]+(\.[^<>()[]\\.,;:\s@\"]+)*)|(\".+\"))@(([[0-9]{1,3}\‌​.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
    return re.test(email); 
}

export default valid