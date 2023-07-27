import { useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"
import AllServicesTable from "../../Components/Admin/AdminAllServicesTable/AllServices"
import AdminAddServices from "../../Components/Admin/AdminAddServices/AdminAddServices"
import { getAllServices } from "../../ApiServices/Admin/admin"
import { ServiceType } from "../../type"


const AdminAllServices = () => {

    const [services, setServices] = useState<ServiceType[]>()
    const [loading,setLoading]=useState<boolean>(false)

    const fetchAllServices = async () => {
        setLoading(true)
        const isServicesAre = await getAllServices()
        setLoading(false)
        setServices(isServicesAre)
        
    }
    useEffect(() => {
        fetchAllServices()
    }, [])

    

    return (
        <Box>
            <Box>
                <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold' }}>All Services</Typography>
            </Box>
            <Box>
                <Box sx={{ paddingRight: '3rem', paddingTop: '2rem', display: 'flex', justifyContent: 'end' }}>
                    <AdminAddServices fetchAllServices={fetchAllServices}/>
                </Box>

                <Box sx={{ padding: '1rem' }}>
                  {loading?<Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 'bold' }}>Loading.....</Typography>:<AllServicesTable services={services} fetchAllServices={fetchAllServices}/>}  
                </Box>

            </Box>
        </Box>
    )
}

export default AdminAllServices