import { Outlet } from "react-router"
import { NavBar } from "../components/organisms/NavBar"
import { Footer } from "../components/organisms/Footer"




export const ProtectedLayout = () => {
  return (
    <div>
        <NavBar />
        <Outlet />
        <Footer />
    </div>
  )
}
