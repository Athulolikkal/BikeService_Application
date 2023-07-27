export default function authDbInterfance(repositories) {
    const findUserByEmail = (email) => repositories.findUserByEmail(email)
    const registerValidUser = (userInfo) => repositories.registerValidUser(userInfo)
    return {
        findUserByEmail,
        registerValidUser
    }
}