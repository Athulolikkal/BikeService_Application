import { Outlet } from "react-router-dom"
import AdminHeader from '../../../Components/Admin/AdminHeader/AdminHeader'

const Layout = () => {
  return (
   <>
   <AdminHeader />
   <Outlet />
   </>
  )
}

export default Layout