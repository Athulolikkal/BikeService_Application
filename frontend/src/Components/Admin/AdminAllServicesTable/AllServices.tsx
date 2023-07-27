/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { useState } from 'react';
import EditServices from '../EditServices/EditServices';
import { ServiceType } from '../../../type';
import { removeService } from '../../../ApiServices/Admin/admin';
import swal from 'sweetalert';
import toast, { Toaster } from 'react-hot-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
} from '@mui/material';



interface Props {
  services?: ServiceType[]
  fetchAllServices: () => Promise<void>
}

const BasicTable: React.FC<Props> = ({ services, fetchAllServices }) => {


  const [page, setPage] = useState<number>(0);
  const rowsPerPage = 5;


  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const removeThisService = async (id: string | undefined) => {
    try {
      const willDelete = await swal({
        title: "Do you want to Remove?",
        text: "Are you sure do you want to remove this service?",
        icon: "warning",

      });
      if (willDelete) {
        const isRemoved = await removeService(id)
        if (isRemoved.status) {
          fetchAllServices()
          toast.success('removed successfully.......')
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

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
              <TableCell sx={{ fontSize: '16px', fontWeight: 'bold' }}>Rate</TableCell>
              <TableCell sx={{ fontSize: '16px', fontWeight: 'bold' }}>Details</TableCell>
              <TableCell sx={{ fontSize: '16px', fontWeight: 'bold' }}>Edit</TableCell>
              <TableCell sx={{ fontSize: '16px', fontWeight: 'bold' }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row?.servicename}</TableCell>
                <TableCell>{row?.rate}</TableCell>
                <TableCell>{row?.details}</TableCell>
                <TableCell>
                  <EditServices serviceid={row?._id} rate={row?.rate} name={row?.servicename} details={row?.details} fetchAllServices={fetchAllServices} />

                </TableCell>
                <TableCell>

                  <Button onClick={() => removeThisService(row?._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[rowsPerPage]}
        component="div"
        count={services?.length ?? 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </div>
  );
};

export default BasicTable;
