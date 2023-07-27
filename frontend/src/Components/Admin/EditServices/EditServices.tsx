import { useState } from 'react'
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { editService } from '../../../ApiServices/Admin/admin';

type formValues = {
    Service: string,
    Rate: string,
    Details: string

}

interface Props {
    serviceid?: string;
    rate?: string;
    name?: string;
    details?: string;
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
const AdminEditServices: React.FC<Props> = ({ serviceid, rate, name, details, fetchAllServices }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const form = useForm<formValues>()
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;
    const prevRate = rate;
    const preName = name;
    const prevDetails = details;

    const onSubmit: SubmitHandler<formValues> = async (data) => {

        if (preName === data?.Service && prevRate === data?.Rate && prevDetails === data?.Details) {
            toast.error("can't submit same values again..")
        } else {
            const isEdit = await editService(serviceid, data?.Service, data?.Rate, data?.Details)
            if (isEdit?.status) {
               
                setTimeout(() => {
                    fetchAllServices()
                    handleClose()
                }, 500)
                toast.success(isEdit?.message)
            } else {
                toast.error(isEdit?.message)
            }
        }
    }


    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Button onClick={handleOpen}>Edit</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ textAlign: 'center', fontSize: '25px', fontWeight: 700, marginBottom: '1rem' }}>
                        Edit You'r Service
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
                                    defaultValue={name}
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
                                            value: 30,
                                            message: 'Name cannot exceed 30 characters',
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
                                    defaultValue={rate}
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
                                    defaultValue={details}
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

export default AdminEditServices