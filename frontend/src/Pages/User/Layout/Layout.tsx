import { Outlet } from "react-router-dom"
import UserNavBar from '../../../Components/User/UserNavbar/UserNabbar'

const Layout = () => {
  return (
   <>
   <UserNavBar />
   <Outlet />
   </>
  )
}

export default Layout