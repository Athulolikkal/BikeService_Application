/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { format, addDays } from 'date-fns';
import swal from 'sweetalert';
import { bookNOw } from '../../../ApiServices/User/user';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';



type formValues = {
    Service: string,
    Rate: string,
    Email: string,
    Date: string

}
interface Props {
    rate?: string
    servicename?: string
    serviceId?: string
}

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const UserBooking: React.FC<Props> = ({ rate, servicename, serviceId }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const form = useForm<formValues>()
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;
    const user = useSelector((state: any) => state.userInfo)
    const userId = user?.userId
    const userName = user?.userName
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<formValues> = async (data) => {
        try {
            const willBook = await swal({
                title: "Do you want to Book?",
                text: "Are you sure do you want to book this service?",
                icon: "info",
            });
            if (willBook) {
                console.log(data, serviceId);
                const continueBooking = await bookNOw(userId, userName, data?.Email, serviceId, servicename, rate, data?.Date)
                if (continueBooking?.status) {
                    toast.success(continueBooking?.message)
                    setTimeout(() => {
                        handleClose()
                        navigate('/userallbookings')
                    }, 500)
                } else {
                    toast.error(continueBooking?.message)
                    setTimeout(() => {
                        handleClose()
                    }, 500)
                }
            }
        } catch (err) {
            console.log(err);
        }

    }
    const currentDate = format(addDays(new Date(), 1), 'yyyy-MM-dd');
    const maximumDate = format(addDays(new Date(), 30), 'yyyy-MM-dd')
    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Button onClick={handleOpen}>book now</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ textAlign: 'center', fontSize: '25px', fontWeight: 700, marginBottom: '1rem' }}>
                        Add Your Booking
                    </Typography>
                    <Box sx={{ padding: '1rem' }}>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <Box sx={{ marginBottom: '1rem' }}>
                                <TextField
                                    type="text"
                                    fullWidth
                                    label="Service"

                                    variant="outlined"
                                    color="secondary"
                                    size='small'
                                    value={servicename}
                                    {...register('Service', {
                                        required: 'text is required',
                                        pattern: {
                                            value: /^(?!\s)[A-Za-z\s'-]+$/,
                                            message: 'only accept letters'
                                        },
                                        minLength: {
                                            value: 3,
                                            message: 'Name must be at least 3 characters long',
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: 'Name cannot exceed 20 characters',
                                        },
                                        validate: (value) => !value.startsWith(' ') ||
                                            "can't start with white spaces"
                                    })}
                                    error={!!errors.Service}
                                    helperText={errors?.Service?.message}
                                />
                            </Box>
                            <Box sx={{ marginBottom: '1rem' }}>
                                <TextField
                                    type="text"
                                    fullWidth
                                    label="Rate"

                                    variant="outlined"
                                    color="secondary"
                                    size='small'
                                    value={rate}
                                    {...register('Rate', {
                                        required: 'rate number is required',
                                        pattern: {
                                            value: /^\d/,
                                            message: 'Please enter the correct rate',
                                        }, minLength: {
                                            value: 2,
                                            message: 'enter a valid rate',
                                        },
                                        maxLength: {
                                            value: 5,
                                            message: 'enter a valid rate',
                                        },
                                    })}
                                    error={!!errors.Rate}
                                    helperText={errors?.Rate?.message}
                                />
                            </Box>
                            <Box sx={{ marginBottom: '1rem' }}>
                                <TextField
                                    type="Email"
                                    fullWidth
                                    label="Email"
                                    placeholder="Email address"

                                    variant="outlined"
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
                            </Box>
                            <Box sx={{ marginBottom: '1rem' }}>
                                <TextField
                                    type="date"
                                    fullWidth
                                    label="Date"

                                    variant="outlined"
                                    color="secondary"
                                    size='small'
                                    defaultValue={currentDate}
                                    {...register('Date', {
                                        required: 'date is required',
                                    })}

                                    inputProps={{
                                        min: currentDate,
                                        max: maximumDate,
                                    }}

                                    error={!!errors.Date}
                                    helperText={errors?.Date?.message}
                                />
                            </Box>

                            <Box>
                                <Button type='submit' variant="contained" fullWidth size="large">
                                    SAVE
                                </Button>
                            </Box>
                        </form>
                        <Box sx={{mt:'1rem'}}>
                            <Typography>
                                *note
                            </Typography>
                            <Typography sx={{fontSize:'13px',mt:'3px'}}>
                                provide the email that you are user using.<br /> you geting service updates through this email
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default UserBooking