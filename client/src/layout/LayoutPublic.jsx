// import Navbar from '../components/Navbar/Navbar'
// import Footer from '../components/Footer/Footer'
import { Outlet } from 'react-router-dom'

const LayoutPublic = () => {
  return (
    <>
        {/* <Navbar /> */}
        <Outlet />
        {/* <Footer /> */}
    </>
  )
}

export default LayoutPublic