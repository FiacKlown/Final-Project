/* eslint-disable react/prop-types */
/* import CardSearch from "../CardSearch/index" */
import { useEffect, useState } from "react";

export default function ModalSearch({ focus, handleClickOverlay }){
    const[search, setSearch] = useState("");
    const [game, setGame] = useState({});
    const[loading, setLoading] = useState(false);

    useEffect(() =>{
        const timeoutApi = setTimeout(() => {
            async function SearchGame() {
                    if(!search) return;
                    setLoading(true); 
                    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&page=1&search=${search}`);
                    const json = await response.json();
                    setGame(json.results)
                    setLoading(false);
                }
                SearchGame()
        },1000)
        
        return() => {
            clearTimeout(timeoutApi);
        }
    }, [search]);

    return(
        <dialog open={focus}>
            <article>
                <header>
                    <button 
                        aria-label="Close" 
                        rel="prev" 
                        onClick={handleClickOverlay}> 
                    </button>
                    <h3>Search your Game</h3>
                </header>
                <form>
                    <input
                        type="search"
                        name="search"
                        value={search}
                        placeholder="Search"
                        aria-label="Search"
                        onChange={(event) => setSearch(event.target.value)}
                    />

                </form>
                
                <div className='suggestWrapper'>
                    {loading && <article aria-busy="true"></article>}
                    {/* {games && games.map((game) => (
                        <CardSearch key={game.id} game={game}/>))} */}
                </div>
                    
                <footer>
                    <button>Submt Search</button>
                </footer>
            </article>
        </dialog>
    )
}