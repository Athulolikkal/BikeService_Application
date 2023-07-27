/* eslint-disable @typescript-eslint/no-explicit-any */

import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import UserLogin from './Pages/User/Userlogin'
import UserSignUp from './Pages/User/UserSignUp'
import UserLayOut from './Pages/User/Layout/Layout'
import UserHome from './Pages/User/UserHome'
import AdminLayout from './Pages/Admin/Layout/Layout'
import AdminAllBookings from './Pages/Admin/AdminAllBookings'
import AdminAllServices from './Pages/Admin/AdminAllServices'
import UserAllBookings from './Pages/User/UserAllBookings'
import AdminLoginPage from './Pages/Admin/AdminLoginPage'
import { useSelector } from 'react-redux';



function App() {
  const user = useSelector((state: any) => state.userInfo)
  const admin= useSelector((state:any)=>state.adminToken)
  const isUser = Object.keys(user).length > 0 ? true : false
  

  return (
    <>
      <Router>
        <Routes>
          <Route path='/userlogin' element={!isUser?(<UserLogin />):(<Navigate to='/' replace={true}/>)} />
          <Route path='/usersignup' element={!isUser?(<UserSignUp />):(<Navigate to='/' replace={true}/>)} />
          <Route path='/adminlogin' element={!admin?(<AdminLoginPage/>):(<Navigate to='/admin' replace={true}/>)} />

          {/* ----------------userlayout----------------------- */}
          <Route path='/' element={isUser ? (<UserLayOut />) : (<Navigate to='/userlogin' replace={true} />)}>
            <Route index element={<UserHome />} />
            <Route path='/userallbookings' element={<UserAllBookings />} />
          </Route>


          {/* ---------------------adminlayout------------- */}
          <Route path='/admin' element={admin?(<AdminLayout />):(<Navigate to='/adminlogin' replace={true}/>)}>
            <Route index element={<AdminAllBookings />} />
            <Route path='/admin/services' element={< AdminAllServices />} />
          </Route>

        </Routes>
      </Router>
    </>
  )
}

export default App
