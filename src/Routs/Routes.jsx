/* eslint-disable react-refresh/only-export-components */

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  Navigate,
} from "react-router";
import { preLoadedFilters, getGame } from "../lib/fetch";
import AppLayout from "../Layout/AppLayout";
import AppHome from "../Pages/AppHome";
import AppGenre from "../Pages/AppGenre";
import AppDetail from "../Pages/AppDetail";
import AppSignIn from "../Pages/AppSignIn";
import AppSignUp from "../Pages/AppSignUp";
import AppAccount from "../Pages/AppAccount";
import AppProfile from "../Pages/AppProfile";
import { useContext } from "react";
import SessionContext from "../context/SessionContext";

export function ProtectedRoutes() {
  const session = useContext(SessionContext);

  if (!session) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AppLayout />} loader={preLoadedFilters}>
        <Route path="/" element={<AppHome />} />
        <Route path="/games/:genre_slug" element={<AppGenre />} />
        <Route path="/game/:id" element={<AppDetail />} loader={getGame} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="/account" element={<AppAccount />} />
      </Route>
      <Route path="/profile" element={<AppProfile />} />
      <Route path="/signin" element={<AppSignIn />} />
      <Route path="/signup" element={<AppSignUp />} />
    </>
  )
);

export default router;
