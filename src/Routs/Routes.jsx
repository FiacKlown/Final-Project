import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import { preLoadedFilters } from "../lib/fetch";
import AppLayout from "../Layout/AppLayout";
import AppHome from "../Pages/AppHome"
import AppGenre from "../Pages/AppGenre";
import AppPlatform from "../Pages/AppPlatform";
import AppDetail from "../Pages/AppDetail";
import AppSignIn from "../Pages/AppSignIn"
import AppSignUp from "../Pages/AppSignUp"



const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/" element={<AppLayout />}loader={preLoadedFilters}>
            <Route path="/" element={<AppHome />}  />
            <Route path="/games/:genre_slug" element={<AppGenre />} />
            <Route path="/games/:platform_slug" element={<AppPlatform />}  />
            <Route path="/game/:id" element={<AppDetail />} />
        </Route>

        <Route path="/signin" element={<AppSignIn />}  />
        <Route path="/signup" element={<AppSignUp />}  />        

        </>
        
        
    )
)

export default router