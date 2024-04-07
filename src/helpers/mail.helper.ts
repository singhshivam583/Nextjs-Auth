import User from '@/models/user.model';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';


export const sendEmail = async({email, emailType, userId}:any) => {
    try {

        const hashedToken = await bcryptjs.hash(userId.toString() + Date.now(), 10);

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,{
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + (60*60)*1000, // token expires after 60 mins
                }
            })
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{
                $set:{
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + (60*60)*1000, // token expires after 60 mins
                }
            })
        }
        
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "0fb5c955492710", // this should be in .env file
              pass: "56211951fd1412" //  this should also be in .env file
            }
          });

        const mailOptions = {
            from: 'shivam@web3ngineer.in', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? "Verify Your Email" : "Forgot Password", // Subject line
            // text: "Hello world?", // plain text body
            html:`<p>
                    Click <a href="${process.env.DOMAIN}/${emailType === 'VERIFY' ? "verifyemail":"resetpassword"}?token=${hashedToken}">here</a> to ${emailType ==="VERIFY" ? "verify your email": "reset your password"}
                    or copy and paste the link below in your browser.
                    </br>
                    ${process.env.DOMAIN}/${emailType === 'VERIFY' ? "verifyemail":"resetpassword"}?token=${hashedToken}
                </p>`, // html body
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse
        
    } catch (error:any) {
        throw new Error(error.message)
    }
}
