import { Link} from "react-router";
import style from './style.module.css'


export default function sideBarFilters({genres, platforms}){
    
    return(
            <aside className={`${style.sidebar}`}>
                <details className='dropdown'>
                        <summary className="btnSidebar">Genres</summary>
                        <ul className={`${style.scrollBtn}`}>
                        {genres.map((genre) => (
                            <li key={genre.id}>
                                <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
                            </li>
                        ))}
                        </ul>
                </details>
                    
                <details className="dropdown">
                    <summary className="btnSidebar">Platforms</summary>
                        <ul className="">
                            {platforms.map((platform) => (
                                <li key={platform.id}> 
                                    <Link to={`/platforms/${platform.slug}`}>{platform.name}</Link>
                                </li>   
                            ))}
                        </ul>
                </details>
            </aside>
    )
}