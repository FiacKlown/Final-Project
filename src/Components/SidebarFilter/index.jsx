/* eslint-disable react-hooks/rules-of-hooks */
import { Link} from "react-router";
import sidebarStyle from '../../css/sidebarStyle.module.css'
import SessionContext from '../../context/SessionContext'
import { useContext } from "react";
import useProfile from "../../hooks/useProfile";

export default function sideBarFilters({genres}){
    const session = useContext(SessionContext)
    const {username} = useProfile();
    
    return(
        <div className={sidebarStyle.positionSticky}>
        {session ? 
            <aside className={sidebarStyle.sidebar}>
                <details className={sidebarStyle.dropdown} >
                    <summary>{username}</summary>
                    <ul>
                        <li>
                            <Link to={"/profile"} href="#">Profile</Link>
                        </li>
                        <li>
                            <Link to={"/account"} href="#">Account</Link>
                        </li>
                    </ul>
                </details>

                <details className={sidebarStyle.dropdown}>
                        <summary>Genres</summary>
                        <ul className={sidebarStyle.scrollBtn}>
                        {genres.map((genre) => (
                            <li key={genre.id}>
                                <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
                            </li>
                        ))}
                        </ul>
                </details>
            </aside>  
        :
            <aside className={sidebarStyle.sidebar}>
                <details className={sidebarStyle.dropdown}>
                        <summary>Genres</summary>
                        <ul className={sidebarStyle.scrollBtn}>
                        {genres.map((genre) => (
                            <li key={genre.id}>
                                <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
                            </li>
                        ))}
                        </ul>
                </details>    
            </aside>
        }
        </div>
    )
}