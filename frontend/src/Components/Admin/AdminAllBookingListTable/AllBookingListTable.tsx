import { useState } from 'react';
import { BookingType } from '../../../type';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import swal from 'sweetalert';
import { changeBookingStatus } from '../../../ApiServices/User/user';
import toast, { Toaster } from 'react-hot-toast';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';


interface Props {
  bookings: BookingType[];
  
}

const AdminAllBookings: React.FC<Props> = ({ bookings }) => {
  const [page, setPage] = useState<number>(0);
  const [isBooking, setBookings] = useState<BookingType[]>(bookings)
  const rowsPerPage = 5;


  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleStatusChange = async (event: SelectChangeEvent, rowIndex: number) => {
    try {
      const willChange = await swal({
        title: "Confirm?",
        text: "Do you want change the status?",
        icon: "info",
      })

      if (willChange) {
        const selectedStatus = event.target.value as string;
        const updatedBookings = [...bookings];
        updatedBookings[rowIndex].status = selectedStatus;
        const bookingId = updatedBookings[rowIndex]?._id
        setBookings(updatedBookings)
        const ChangeStatus = await changeBookingStatus(bookingId, selectedStatus)
        if (ChangeStatus?.status) {
          toast.success(ChangeStatus?.message)
        } else {
          toast.error(ChangeStatus?.message)
        }

      }

    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '16px', fontWeight: 'bold' }}>Service Name</TableCell>
              <TableCell sx={{ fontSize: '16px', fontWeight: 'bold' }}>User Name</TableCell>
              <TableCell sx={{ fontSize: '16px', fontWeight: 'bold' }}>Current Status</TableCell>
              <TableCell sx={{ fontSize: '16px', fontWeight: 'bold' }}>Rate</TableCell>
              <TableCell sx={{ fontSize: '16px', fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontSize: '16px', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontSize: '16px', fontWeight: 'bold' }}>ChangeStatus</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isBooking?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={row?._id}>
                <TableCell>{row?.serviceName}</TableCell>
                <TableCell>{row?.userName}</TableCell>
                <TableCell sx={{
                  color: row?.status === 'Completed' ? 'green' : row?.status === 'Ready for Delivery' ? 'blue' : 'red',
                  fontWeight: 'bold'
                }}>
                  {row?.status}
                </TableCell>
                <TableCell>{row?.serviceRate}</TableCell>
                <TableCell>{row?.date}</TableCell>
                <TableCell>{row?.email}</TableCell>
                <TableCell>
                  {row?.status === 'Pending' && <Select
                    value={row?.status}
                    onChange={(event) => handleStatusChange(event, index)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="">
                      {/* <em>{row?.status}</em> */}
                    </MenuItem>
                    <MenuItem value="Ready for Delivery">Ready for Delivery</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                  </Select>}
                  {row?.status === 'Ready for Delivery' && <Select
                    value={row?.status}
                    onChange={(event) => handleStatusChange(event, index)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="">
                      {/* <em>{row?.status}</em> */}
                    </MenuItem>
                    <MenuItem value="Ready for Delivery">Ready for Delivery</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>

                  </Select>}




                  {row?.status === 'Completed' &&
                    <TableCell sx={{ color: 'green', fontWeight: 'bold' }}>{row?.status}</TableCell>
                  }
                </TableCell>

              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[rowsPerPage]}
        component="div"
        count={bookings?.length ?? 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </div>
  )
}

export default AdminAllBookings