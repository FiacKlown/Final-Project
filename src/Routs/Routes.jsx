import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import { preLoadedFilters } from "../lib/fetch";
import AppLayout from "../Layout/AppLayout";
import AppHome from "../Pages/AppHome"
import AppGenre from "../Pages/AppGenre";
/* import AppSignIn from "../Pages/AppSignIn"
import AppSignUP from "../Pages/AppSignUP" */



const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<AppLayout />}loader={preLoadedFilters}>
            <Route path="/" element={<AppHome />}   />

            <Route path="/games/:genre_slug" element={<AppGenre />}  />
        </Route>
    )
)

export default router