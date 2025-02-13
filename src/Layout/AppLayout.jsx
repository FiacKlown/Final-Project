import NavbarUI from "../Components/NavbarUI/index.jsx"
import SidebarFilter from "../Components/SidebarFilter/index.jsx";
import { useLoaderData } from "react-router";
import { Outlet } from "react-router";
import style from "./style.module.css";

function AppLayout() {
  const { genres, platforms } = useLoaderData();

  return (
    <div className="">
      <NavbarUI />

      <div className={`${style.layoutWrapper}`}>
        <div className={`${style.sidebarWrapper}`}>
          <SidebarFilter genres={genres} platforms={platforms} />
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
