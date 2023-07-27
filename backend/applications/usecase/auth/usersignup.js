import userEntity from '../../../entities/userEntity.js'

export default async function userSignUp(username, email, password, phonenumber, authDb, authServices) {
    try {
        //encrypting the password for storing in database
        const hashedPassword = await authServices.passwordBcrypt(password)
       //finding is the email already exists(means:he  already have an account)
        const isUser = await authDb.findUserByEmail(email)
        if (isUser.length === 0) {
            const name = username.toUpperCase();
            const userInfo = {
                name, email, hashedPassword, phonenumber
            }
            //passing data to entity of user
            const userDetails = await userEntity(userInfo)
            //registering user
            const addUser = await authDb.registerValidUser(userDetails)
            const userId=addUser?._id
            //creating accesstoken
            const accessToken = await authServices.createAccessToken({ name, email, phonenumber,userId })
            return { status: true, userAccessToken: accessToken, userDetails: { name, email, phonenumber,userId } }

        } else {
            return { status: false, message: 'invalid useremail....' }
        }


    } catch (err) {
        console.log(err);
    }
}