import authRouter from './authroutes/authetication.js'
import adminRouter from './adminroutes/admin.js'
import userRouter from './userroutes/user.js'

export default function routes(app, express) {

    app.use('/api/auth', authRouter(express))
    app.use('/api/admin', adminRouter(express))
    app.use('/api/user', userRouter(express))

}