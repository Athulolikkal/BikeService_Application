import userSchema from '../model/userSchema.js'

export default function authenticationRepositories() {

    const findUserByEmail = (email) => {
        try {
            return userSchema.find({ email })
        } catch (err) {
            console.log(err);
        }
    }

    const registerValidUser = (userInfo) => {
        try {
            const newUser = new userSchema({
                name: userInfo?.getUserName(),
                email: userInfo?.getUserEmail(),
                phone: userInfo?.getUserPhone(),
                password: userInfo?.getUserPassword()
            })
            return newUser.save()
        } catch (err) {
            console.log(err);
        }
    }

    return {
        findUserByEmail,
        registerValidUser
    }
}