import { Outlet } from "react-router"
import NavbarUI from "../Components/NavbarUi"

function AppLayout(){
    return (
        <div>
            {/* <div className="navbarMargin" > 
                        <div className="roundNav color2">
                                <div style={{
                                    width: "40%"
                                }}>
                                    <input className="searchBar left"
                                        type="search"
                                        name="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                    />
                                </div>
                                <div className="buttonPosition" style={{ marginLeft: "auto" }}>
                                    <button className="loginBtn left">Login</button>
                                    <button className="loginBtn left">Register</button>
                                </div>
                                        
                        </div >
                </div> */}

            <NavbarUI />        
            <Outlet />    
        </div>
    )
}

export default AppLayout