export default async function adminLogin(email, password, authServices) {
    try {
        //on admin side i am creating admin as super admin so just checking the values comes as parameter is same to initialised value
        //its not a good pratice actually should encrypt the password and store that in data base
        //#note: only for admin I did like this for user i encrypting and stroing in data base
        const validEmail = 'admin@gmail.com'
        const validPassword = "12345"
        if (email === validEmail) {
            if (password === validPassword) {
                //if admin is valid then creating an jwt accesstoken
                const adminAccessToken = await authServices.createAccessToken({ email })
                return { status: true, message: 'admin logged successfully', adminAccessToken: adminAccessToken }
            } else {
                return { status: false, message: 'incorrect email or password' }
            }
        } else {
            return { status: false, message: 'incorrect email or password' }
        }
    } catch (err) {
        console.log(err);
    }
}