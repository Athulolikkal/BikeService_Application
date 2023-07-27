import AllBookingListTable from "../../Components/Admin/AdminAllBookingListTable/AllBookingListTable"
import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getAllBookings } from "../../ApiServices/User/user"
import { BookingType } from "../../type"

const AdminAllBookings = () => {
  const [bookings, setBookings] = useState<BookingType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const getAllUserBookings = async () => {
    setLoading(true)
    const allBookings = await getAllBookings()
    setLoading(false)
    setBookings(allBookings)
  }
  useEffect(() => {
    getAllUserBookings()
  }, [])

  return (
    <>
      <Box sx={{marginBottom:'2rem'}}>
        <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold' }}>All Bookings</Typography>
      </Box>
      <Box sx={{padding:'1rem'}}>
        {loading ? (<Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 'bold',marginTop:'4rem' }}>Loading.....</Typography>) :
          (<AllBookingListTable bookings={bookings} />)}
      </Box>
    </>
  )
}

export default AdminAllBookings