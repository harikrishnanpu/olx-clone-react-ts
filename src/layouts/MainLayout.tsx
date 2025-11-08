import { Outlet } from "react-router"
import { CategoriesBar } from "../components/organisms/CategoriesBar"
import { NavBar } from "../components/organisms/NavBar"
import { Footer } from "../components/organisms/Footer"

function MainLayout() {
  return (
    <div>
        <NavBar />
        <CategoriesBar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default MainLayout