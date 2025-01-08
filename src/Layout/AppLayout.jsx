/* import { Outlet } from "react-router" */
import NavbarUI from "../Components/NavbarUI"
import SidebarFilter from "../Components/SidebarFilter"
/* import { useLoaderData, Link } from "react-router"; */

function AppLayout(){
  /*   const {genres, platforms} = useLoaderData */

    return (
            <div className="">
                <NavbarUI/>
                
                <main>
                    <SidebarFilter />
                </main>
                
                
                 
            </div> 
              

    )
}

export default AppLayout