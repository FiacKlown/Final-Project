/* import { useLoaderData, Link } from "react-router";


export default function sideBarFilters(){
    const {genres, platforms} = useLoaderData

    return(
       <main className="">
                <aside className="sidebar">
                    <details className="dropdown">
                        <summary className="btnSidebar">Generes</summary>
                            <ul className="">
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
                                {platforms.map((platforms) => (
                                    <li key={platforms.id}> 
                                        <Link to={`/platforms/${platforms.slug}`}>{platforms.name}</Link>
                                    </li>   
                                ))}
                            </ul>
                    </details>
                </aside>
        </main> 
    )
} */