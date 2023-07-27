import userSignUpUsecase from "../../applications/usecase/auth/usersignup.js";
import userLoginUsecase from "../../applications/usecase/auth/userLogin.js";
import adminLoginUsecase from "../../applications/usecase/auth/adminLogin.js";

export default function authentication
    (authDbInterfance,
        authenticationRepositoriesImplements,
        authServicesImplements,
        authServicesInterfaces) {

    const authDb = authDbInterfance(authenticationRepositoriesImplements())
    const authServices = authServicesInterfaces(authServicesImplements())

    const userSignUp = (req, res) => {
        const { name, email, password, phonenumber } = req?.body
        userSignUpUsecase(name, email, password, phonenumber, authDb, authServices).then((response) => {
            res.json(response)
        }).catch((err) => console.log(err))
    }

    const userLogin = (req, res) => {
        const { email, password } = req?.body
        userLoginUsecase(email, password, authDb, authServices).then((response) => {
            res.json(response)
        }).catch((err) => console.log(err))

    }

    const adminLogin = (req, res) => {
        const { email, password } = req?.body
        adminLoginUsecase(email, password, authServices).then((response) => {
            res.json(response)
        }).catch((err) => console.log(err))

    }
    return {
        userSignUp,
        userLogin,
        adminLogin
    }
}