import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import { preLoadedFilters } from "../lib/fetch";
import AppLayout from "../Layout/AppLayout";
import AppHome from "../Pages/AppHome"
import AppSignIn from "../Pages/AppSignIn"
import AppSignUP from "../Pages/AppSignUP"



const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<AppHome />} />


        </Route>
    )
)

export default router