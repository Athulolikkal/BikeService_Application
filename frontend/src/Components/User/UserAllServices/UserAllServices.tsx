import { useEffect, useState } from 'react'
import { Box, Typography} from '@mui/material'
import { ContainerBox, WrapperBox } from './Style'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { ServiceType } from '../../../type';
import { getAllServices } from '../../../ApiServices/Admin/admin';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import UserServiceBooking from '../UserServiceBookingModal/UserServiceBooking';

const UserHome = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [services, setServices] = useState<ServiceType[]>([])
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 3;

  const fetchAllServices = async () => {
    setLoading(true)
    const allServices = await getAllServices()
    setLoading(false)
    setServices(allServices)
  }

  useEffect(() => {
    fetchAllServices()
  }, [])

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  
  const lastIndex = page * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const displayedServices = services.slice(firstIndex, lastIndex);

  return (
    <>
      <Box sx={{ marginTop: '5rem' }}>
        <Box>
          <Typography variant='h4' sx={{ textAlign: 'center', fontWeight: 'bold', color: '#6C3428', marginBottom: '2rem' }}>Find Your All Services</Typography>
        </Box>
        <ContainerBox>
          {loading ? (<Typography variant='body2' sx={{ textAlign: 'center', fontWeight: 'bold', color: '#6C3428', marginBottom: '2rem' }}>Loading.........</Typography>) :
            (
              displayedServices.map((item: ServiceType) => (
                <WrapperBox key={item._id}>
                  <Typography variant='h5' sx={{ textAlign: 'center', fontWeight: 'bold', width: '100%', color: '#6C3428', marginTop: '5px', fontSize: '22px' }}>{item?.servicename}</Typography>
                  <Typography variant='body1' sx={{ textAlign: 'center', width: '100%', color: '#6C3428', marginTop: '5px' }}>{item?.details}</Typography>
                  <Typography variant='h6' sx={{ fontSize: '16px', color: '#8B7E74', textAlign: 'center', marginTop: '5px' }}>Service Rate:
                    <span style={{ fontWeight: '700', fontSize: '22px', color: '#6C3428' }}><CurrencyRupeeIcon fontSize='small' sx={{ color: '#6C3428' }} />{item?.rate}</span>
                  </Typography>
                 
                  <Box  sx={{ marginTop: '5px',display:'flex',justifyContent:'center' }}>
                   <UserServiceBooking rate={item?.rate} servicename={item?.servicename} serviceId={item?._id} />
                  </Box>
                </WrapperBox>
              )))
          }
        </ContainerBox>

      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3,mb:3 }}>
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(services.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
          />
        </Stack>
      </Box>
    </>
  )
}

export default UserHome;
