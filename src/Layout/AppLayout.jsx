import NavbarUI from "../components/navbarUI"
import SidebarFilter from "../components/sidebarFilter/index.jsx";
import { useLoaderData } from "react-router";
import { Outlet } from "react-router";
import layoutStyle from "../css/layoutStyle.module.css";


function AppLayout() {
  const { genres, platforms } = useLoaderData();

  return (
    <div>
      <NavbarUI />

      <div className={layoutStyle.layoutWrapper}>
        <div className={layoutStyle.sidebarWrapper}>
          <SidebarFilter genres={genres} platforms={platforms} />
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
