export default async function userLogin(email, password, authDb, authServices) {
    try {
        //finding user is valid with is email
        const isValidEmail = await authDb.findUserByEmail(email)
        if (isValidEmail?.length != 0 && isValidEmail[0]?.password) {
            const passwordDb = isValidEmail[0]?.password
            //comparing the encrypted password in the data base and enterd password is true?
            const isPassword = await authServices.comparePassword(passwordDb, password)
            if (isPassword) {
               const userId= isValidEmail[0]?._id
                const name = isValidEmail[0]?.name
                const email = isValidEmail[0]?.email
                const phone = isValidEmail[0]?.phone
               //if it true then i am creating an accesstoken with user details
                const userAccessToken =await authServices.createAccessToken({userId, name, email, phone })
               
                return { status: true, userAccessToken, userDetails: { name, email, phone,userId } }
            } else {
                return { status: false, message: 'invalid password or email !..' }
            }
        } else {
            return { status: false, message: 'invalid password or email !..' }
        }
    } catch (err) {
        console.log(err);
    }
}