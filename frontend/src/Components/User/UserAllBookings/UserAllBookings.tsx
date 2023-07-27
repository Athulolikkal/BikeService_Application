import { useState } from 'react';
import { BookingType } from '../../../type';
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
    bookings: BookingType[]
}

const UserAllBookings: React.FC<Props> = ({ bookings }) => {
    const [page, setPage] = useState<number>(0);
    const rowsPerPage = 5;
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: '16px', fontWeight: 'bold' }}>Service Name</TableCell>
                            <TableCell sx={{ fontSize: '16px', fontWeight: 'bold' }}>Current Status</TableCell>
                            <TableCell sx={{ fontSize: '16px', fontWeight: 'bold' }}>Rate</TableCell>
                            <TableCell sx={{ fontSize: '16px', fontWeight: 'bold' }}>Date</TableCell>
                            <TableCell sx={{ fontSize: '16px', fontWeight: 'bold' }}>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row?.serviceName}</TableCell>
                                <TableCell sx={{
                                    color: row?.status === 'Completed' ? 'green' : row?.status === 'Ready for Delivery' ? 'blue' : 'red',
                                    fontWeight: 'bold'
                                }}>{row?.status}</TableCell>
                                <TableCell>{row?.serviceRate}</TableCell>
                                <TableCell>{row?.date}</TableCell>
                                <TableCell>{row?.email}</TableCell>
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

export default UserAllBookings