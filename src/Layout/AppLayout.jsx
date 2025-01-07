import { Outlet } from "react-router"
import NavbarUi from "../Components/NavbarUi"

function AppLayout(){
    return (
        <div>
            <NavbarUi />
            <Outlet />    
        </div>
    )
}

export default AppLayout