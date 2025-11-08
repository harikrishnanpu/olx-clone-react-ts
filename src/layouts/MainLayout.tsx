import { Outlet } from "react-router"
import { CategoriesBar } from "../components/organisms/CategoriesBar"
import { NavBar } from "../components/organisms/NavBar"

function MainLayout() {
  return (
    <div>
        <NavBar />
        <CategoriesBar />
        <Outlet />
    </div>
  )
}

export default MainLayout