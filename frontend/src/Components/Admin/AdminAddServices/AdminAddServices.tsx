import { useState } from 'react'
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addServiceData } from '../../../ApiServices/Admin/admin';
import toast, { Toaster } from 'react-hot-toast';


type formValues = {
    Service: string,
    Rate: string,
    Details: string

}
interface Props {
    fetchAllServices: () => Promise<void>
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
const AdminAddServices: React.FC<Props> = ({ fetchAllServices }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const form = useForm<formValues>()
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit: SubmitHandler<formValues> = async (data) => {
        const addService = await addServiceData(data?.Service, data?.Rate, data?.Details)
        if (addService?.status) {
            toast.success('successfully added the service')
            setTimeout(() => {
                fetchAllServices()
                handleClose()
            }, 500)
        } else {
            toast.error('service already exists')
        }
    }


    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Button onClick={handleOpen} variant='outlined'>Add Services</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ textAlign: 'center', fontSize: '25px', fontWeight: 700, marginBottom: '1rem' }}>
                        Add You'r Service
                    </Typography>
                    <Box sx={{ padding: '1rem' }}>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <Box sx={{ marginBottom: '1rem' }}>
                                <TextField
                                    type="text"
                                    fullWidth
                                    label="Service"
                                    placeholder="Enter the service name"
                                    variant="outlined"
                                    color="secondary"
                                    size='small'
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
                                    placeholder="total rate is required"
                                    variant="outlined"
                                    color="secondary"
                                    size='small'
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
                                    type="text"
                                    fullWidth
                                    label="Details"
                                    placeholder="Enter the details"
                                    variant="outlined"
                                    color="secondary"
                                    size='small'
                                    {...register('Details', {
                                        required: 'details is required',
                                        pattern: {
                                            value: /^(?!\s)[A-Za-z\s'-]+$/,
                                            message: 'only accept letters'
                                        },
                                        minLength: {
                                            value: 10,
                                            message: 'details must be at least 10 characters long',
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'details cannot exceed 50 characters',
                                        },
                                        validate: (value) => !value.startsWith(' ') ||
                                            "can't start with white spaces"
                                    })}
                                    error={!!errors.Details}
                                    helperText={errors?.Details?.message}
                                />
                            </Box>

                            <Box>
                                <Button type='submit' variant="contained" fullWidth size="large">
                                    SAVE
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default AdminAddServices