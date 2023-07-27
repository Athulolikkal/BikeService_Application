export default function authServicesInterfaces(repositories) {
    const passwordBcrypt = (password) => repositories.passwordBcrypt(password)
    const comparePassword = (passwordDb, password) => repositories.comparePassword(passwordDb, password)
    const createAccessToken = (data) => repositories.createAccessToken(data)
    const verifyAccessToken = (token) => repositories.verifyAccessToken(token)
    return {
        passwordBcrypt,
        comparePassword,
        createAccessToken,
        verifyAccessToken
    }
}