import dotenv from 'dotenv'
dotenv.config()
export default {
    port: process.env.PORT || 3000,
    mongo: {

        uri: process.env.URL
    },
    jwtAccessSecretKey: process.env.JWT_SECRET_TOKEN || 'secretidofAccessTokenjwtForBikeServiceBookingWebApp',
}