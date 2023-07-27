import { Typography, Box } from "@mui/material"
import UserAllBookingsComponent from "../../Components/User/UserAllBookings/UserAllBookings"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { findUserBookingById } from "../../ApiServices/User/user"
import { BookingType,StoreType} from "../../type"


const UserAllBookings = () => {
  const [bookings, setBookings] = useState<BookingType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const user = useSelector((state: StoreType) => state?.userInfo)
  const userId = user?.userId

  const getAllUserBooking = async () => {
    setLoading(true)
    const totalBookings = await findUserBookingById(userId)
    setLoading(false)
    setBookings(totalBookings)
  }

  useEffect(() => {
    getAllUserBooking()
  }, [])

  return (
    <Box sx={{ marginTop: '5rem' }}>
      <Box>
        <Typography variant='h4' sx={{ textAlign: 'center', fontWeight: 'bold', color: '#6C3428', marginBottom: '2rem' }}>All My Bookings</Typography>
      </Box>
      <Box sx={{ padding: '1rem' }}>
      {loading?(<Typography variant='body2' sx={{ textAlign: 'center', fontWeight: 'bold', color: 'black', marginBottom: '2rem' }}>loading.......</Typography>):
        (<UserAllBookingsComponent bookings={bookings}/>)}
      </Box>

    </Box>
  )
}

export default UserAllBookings