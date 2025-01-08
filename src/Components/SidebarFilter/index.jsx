/* import { useLoaderData, Link } from "react-router"; */
/* import style from './style.module.css' */

import { Outlet } from "react-router";

export default function sideBarFilters(){
    /* const {genres, platforms} = useLoaderData */

    return(
       <main>
            <aside className="sidebar">
                <details className="dropdown">
                        <summary className="btnSidebar">Genres</summary>
                        <ul>
                            {/* {genres.map((genre) => (
                                <li key={genre.id}>
                                    <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
                                </li>
                            ))} */}
                        </ul>
                </details>
                    
                <details className="dropdown">
                    <summary className="btnSidebar">Platforms</summary>
                        <ul className="">
                            {/* {platforms.map((platform) => (
                                <li key={platform.id}> 
                                    <Link to={`/platforms/${platform.slug}`}>{platform.name}</Link>
                                </li>   
                            ))} */}
                        </ul>
                </details>
            </aside>

            <Outlet/>
        </main> 
    )
}