const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const OAuth2 = google.auth
const OATH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env

 const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OATH_PLAYGROUND
 )

//send mail
const sendEmail = (to, url, txt) => {
    oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN
    })

    const accessToken = oauth2Client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken
        }
    })

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject:'Novarea',
        html:`
        <div style=" max-width: 600px; margin:auto; border: 8px solid rgb(100, 100, 100); padding: 50px 20px; font-size: 120%;">
    
            <h2 style="text-align: center; color: darkslategray;">Welcome to Novarea !</h2>
    
            <p>Congratulations! You have completed the account to join the Novarea community.
            Just click the button below to validate your email account.
            </p>
    
            <a href=${url} style="background: darkslategray; text-decoration: none; color: white;  padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>

        </div>
        `
    }

    smtpTransport.sendMail(mailOptions, (err, infor) => {
        if(err) return err;
        return infor
    })
}

module.exports = sendEmail