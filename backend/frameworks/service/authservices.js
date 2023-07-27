import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config/config.js'

export default function authServices() {
//all service implements are this. passing this to interface and calling function here that return these features their
    const passwordBcrypt = async (password) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt)
            return hashPassword
        } catch (err) {
            console.log(err);
        }
    }

    const comparePassword = async (passwordDb, password) => {
        try {
            const isPassword = await bcrypt.compare(password, passwordDb)
            return isPassword
        } catch (err) {
            console.log(err);
        }
    }

    const createAccessToken = async (data) => {
        try {
            const accessToken = jwt.sign(data, config.jwtAccessSecretKey, { expiresIn: '60m' })
            return accessToken
        } catch (err) {
            console.log(err);
        }
    }

    const verifyAccessToken = async (tokenData) => {
        try {
            const isVerified = await jwt.verify(tokendata, config.jwtAccessSecretKey)
            return isVerified
        } catch (err) {
            console.log(err);
        }
    }

    return {
        passwordBcrypt,
        comparePassword,
        createAccessToken,
        verifyAccessToken
    }

}