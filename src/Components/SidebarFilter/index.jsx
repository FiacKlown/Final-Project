/* eslint-disable react-hooks/rules-of-hooks */
import { Link} from "react-router";
import style from './style.module.css'
import SessionContext from '../../context/SessionContext'
import { useContext } from "react";
import useProfile from "../../hooks/useProfile";

export default function sideBarFilters({genres}){
    const session = useContext(SessionContext)
    const {username} = useProfile();
    
    return(
        <div className={style.positionSticky}>
        {session ? 
            <aside className={style.sidebar}>
                <details className={style.dropdown} >
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

                <details className={style.dropdown}>
                        <summary>Genres</summary>
                        <ul className={style.scrollBtn}>
                        {genres.map((genre) => (
                            <li key={genre.id}>
                                <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
                            </li>
                        ))}
                        </ul>
                </details>
            </aside>  
        :
            <aside className={style.sidebar}>
                <details className={style.dropdown}>
                        <summary>Genres</summary>
                        <ul className={`${style.scrollBtn}`}>
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