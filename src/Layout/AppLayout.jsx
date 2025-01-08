import NavbarUI from "../Components/NavbarUI"
import SidebarFilter from "../Components/SidebarFilter/index.jsx"
import  { useLoaderData } from "react-router"
import { Outlet} from "react-router";

function AppLayout(){
    const {genres, platforms} = useLoaderData();

    return (
            <div className="">
                <NavbarUI/>
                
                <div className="d-flex">
                   <SidebarFilter genres={genres} platforms={platforms}/>

                    <Outlet/>
                </div>
                
            </div> 
              

    )
}

export default AppLayout