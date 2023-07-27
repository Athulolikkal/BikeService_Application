import { useState } from 'react'
import {

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
import './style.css'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import sideIcone from '../../../assets/Motocross-amico.png'
import { useDispatch } from 'react-redux';
import { userLogin } from '../../../ApiServices/AuthServics/userAuth'
import { addUserInfo } from '../../../Redux/user/userInfoSlicer';


type formValues = {
  Email: string,
  Password: string,

}
const UserLogin = () => {
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const navigate = useNavigate()
  const handlePassVisibility = () => {
    setViewPassword((prev) => !prev);
  };

   const dispatch= useDispatch()

  //useForm attributes
  const form = useForm<formValues>()
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit: SubmitHandler<formValues> = async (data) => {
    const isUser = await userLogin(data?.Email, data?.Password)
    if (isUser?.status === false) {
      toast.error(isUser?.message)
    } else {  
      toast.success('sucessfully logged in')
      setTimeout(() => {
       dispatch(addUserInfo({userId:isUser?.userDetails?.userId,userName:isUser?.userDetails?.name,email:isUser?.userDetails?.email,phone:isUser?.userDetails?.phone}))
        navigate('/')
      }, 500)

    }
  };


  return (
    <div>
      <Container maxWidth="md">
        <Toaster
          position="top-center"
          reverseOrder={false}
        />

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

                  <Typography variant='h5' style={{ fontWeight: 'bold', textAlign: 'center', color: "#4B6190" }}> Login </Typography>

                  <Typography style={{ textAlign: 'center', color: "#8F95A2", fontSize: '14px', paddingTop: '6px' }}>Please provide the necessary details for  login!</Typography>

                  <Grid item>
                    <TextField
                      type="Email"
                      fullWidth
                      label="Email"
                      placeholder="Email address"
                      variant="standard"
                      color="secondary"
                      size='small'
                      {...register('Email', {
                        required: 'email is required',
                        pattern: {
                          value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                          message: 'Please enter a valid email address',
                        }
                      })}
                      error={!!errors.Email}
                      helperText={errors?.Email?.message}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      type={viewPassword ? 'text' : 'password'}
                      fullWidth
                      label="Password"
                      placeholder="Enter the password"
                      variant="standard"
                      color="secondary"

                      size='small'
                      {...register('Password', {
                        required: 'confirm your password',
                      })}
                      error={!!errors.Password}


                      helperText={errors.Password ? errors.Password?.message : 'dont share the password'}

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
                      Login
                    </Button>
                  </Grid>

                  <Grid sx={{ marginTop: '1rem' }}>
                    <Link
                      variant="body2"
                      style={{
                        cursor: 'pointer',
                        color: '#5F5B5B',
                        textDecoration: 'none',
                        padding: '2rem'
                      }}
                      onClick={() => navigate('/usersignup')}
                    >
                      If you don't have an account?
                    </Link>
                  </Grid>

                </Grid>
              </form>
            </Paper>
          </Grid>
          <Grid item md={6} xs={12} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
            <img
              className="rounded-2xl"

              src={sideIcone}
              alt="bikeservices"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Grid>
        </Grid>
      </Container>
    </div>

  )
}

export default UserLogin