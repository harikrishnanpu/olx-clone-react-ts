import { Suspense } from "react"
import { router } from "."
import { RouterProvider } from "react-router-dom"
import { Loading } from "../components/organisms/Loading"


function AppRouter() {
  return (
    <Suspense fallback={<Loading count={20} />}>
        <RouterProvider router={router} />
    </Suspense>
  )
}

export default AppRouter