import { useState } from 'react'
import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import './style.css'
import sideIcon from '../../../assets/20547283_6310507.jpg'
import { userSignup } from '../../../ApiServices/AuthServics/userAuth'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import { addUserInfo } from '../../../Redux/user/userInfoSlicer';




type formValues = {
    name: string,
    email: string,
    phonenumber: number,
    password: string,
    repassword: string;
}



const Signup = () => {
    const [viewPassword, setViewPassword] = useState<boolean>(false);
    const navigate = useNavigate()
    const handlePassVisibility = () => {
        setViewPassword((prev) => !prev);
    };
    const dispatch = useDispatch()

    //useForm attributes
    const form = useForm<formValues>()
    const { register, handleSubmit, formState, getValues } = form;
    const { errors } = formState;

    const validatePasswordMatch = (value: string) => {
        const { password } = getValues();
        return value === password || 'Passwords do not match';
    };

    const onSubmit: SubmitHandler<formValues> = async (data) => {
        const { name, email, password, phonenumber } = data
        const isUserSignUp = await userSignup(name, email, password, phonenumber)
        if (isUserSignUp?.status === false) {
            toast.error('email already exists')
        }
        else {
            dispatch(addUserInfo({userId:isUserSignUp?.userDetails?.userId,userName:isUserSignUp?.userDetails?.name,email:isUserSignUp?.userDetails?.email,phone:isUserSignUp?.userDetails?.phonenumber}))
            navigate('/')
        }


    };


    return (
        <div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Container maxWidth="md">
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Grid item md={6} xs={12}>
                        <Paper elevation={0} sx={{ padding: 5 }}>
                            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                <Grid container direction="column" spacing={2}>

                                    <Typography variant='h5' style={{ fontWeight: 'bold', textAlign: 'center', color: "#4B6190" }}>Register Account</Typography>

                                    <Typography style={{ textAlign: 'center', color: "#8F95A2", fontSize: '14px', paddingTop: '6px' }}>register your account for join in our family</Typography>


                                    <Grid item>
                                        <TextField
                                            type="text"
                                            fullWidth
                                            label="name"
                                            placeholder="Enter your full name"
                                            variant="outlined"
                                            color="secondary"
                                            size='small'
                                            {...register('name', {
                                                required: 'name is required',
                                                pattern: {
                                                    value: /^(?!\s)[A-Za-z\s'-]+$/,
                                                    message: 'only accept letters'
                                                },
                                                minLength: {
                                                    value: 3,
                                                    message: 'Name must be at least 3 characters long',
                                                },
                                                maxLength: {
                                                    value: 30,
                                                    message: 'Name cannot exceed 30 characters',
                                                },
                                                validate: (value) => !value.startsWith(' ') ||
                                                    "can't start with white spaces"
                                            })}
                                            error={!!errors.name}
                                            helperText={errors?.name?.message}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            type="email"
                                            fullWidth
                                            label="email"
                                            placeholder="Email address"
                                            variant="outlined"
                                            color="secondary"
                                            size='small'
                                            {...register('email', {
                                                required: 'email is required',
                                                pattern: {
                                                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                                                    message: 'Please enter a valid email address',
                                                }
                                            })}
                                            error={!!errors.email}
                                            helperText={errors?.email?.message}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            type="text"
                                            fullWidth
                                            label="phonenumber"
                                            placeholder="Phone number"
                                            variant="outlined"
                                            color="secondary"
                                            size='small'
                                            {...register('phonenumber', {
                                                required: 'phone number is required',
                                                pattern: {
                                                    value: /^\d{10}$/,
                                                    message: 'Please enter a valid phone number',
                                                }
                                            })}
                                            error={!!errors.phonenumber}
                                            helperText={errors?.phonenumber?.message}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            type={viewPassword ? 'text' : 'password'}
                                            fullWidth
                                            label="password"
                                            placeholder="Enter the password"
                                            variant="outlined"
                                            color="secondary"
                                            size='small'
                                            {...register('password', {
                                                required: 'password is required',
                                                maxLength: {
                                                    value: 8,
                                                    message: 'maximum eight letters'
                                                },
                                                minLength: {
                                                    value: 4,
                                                    message: 'minimum four letters'
                                                }
                                            })}
                                            error={!!errors.password}
                                            helperText={errors?.password?.message}

                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            type={viewPassword ? 'text' : 'password'}
                                            fullWidth
                                            label="repassword"
                                            placeholder="Re-enter the password"
                                            variant="outlined"
                                            color="secondary"

                                            size='small'
                                            {...register('repassword', {
                                                required: 'confirm your password',
                                                validate: validatePasswordMatch,
                                            })}
                                            error={!!errors.repassword}


                                            helperText={errors.repassword ? errors.repassword?.message : 'dont share the password'}

                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <div className="icon-button-wrapper">
                                                            <IconButton
                                                                onClick={handlePassVisibility}
                                                                aria-label="password"
                                                                edge="end"
                                                                disableFocusRipple
                                                            >
                                                                {viewPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </div>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item>
                                        <Button type='submit' variant="contained" fullWidth size="large">
                                            SignUp
                                        </Button>
                                    </Grid>

                                    <Grid
                                        container
                                        justifyContent="center"
                                        alignItems="center"
                                        marginTop={2}
                                        marginBottom={2}
                                    >
                                        <Box flexGrow={1}>
                                            <hr />
                                        </Box>
                                        <Typography variant="body1" style={{ margin: '0 1rem' }}>
                                            or
                                        </Typography>
                                        <Box flexGrow={1}>
                                            <hr />
                                        </Box>
                                    </Grid>



                                    <Grid item paddingTop={2}>

                                        <Link
                                            variant="body2"
                                            style={{
                                                cursor: 'pointer',
                                                color: '#5F5B5B',
                                                textDecoration: 'none',
                                            }}

                                            onClick={() => navigate('/userlogin')}
                                        >
                                            If you already have an account?
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item md={6} xs={12} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                        <img
                            className="rounded-2xl"

                            src={sideIcon}
                            alt="bikeservices"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </div>

    )
}

export default Signup