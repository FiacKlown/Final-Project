import { useEffect, useState} from "react";
/* import GameUI from "../Components/GameUI/Index"; */
/* import SidebarFilter from "../Components/SidebarFilter" */
import GameUI from "../Components/GameUI/Index";

function AppHome(){

    const [games, setGames] = useState([]);
    const[loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchGames() {

            setLoading(true);
            // import.meta.env.KEY = Serve per fare pulling delle variabili d'ambiente
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&dates=2023-01-01,2024-01-01`);
            const json = await response.json();
            setGames(json.results)
            setLoading(false);
            
        }
        
        fetchGames();
    },[])

    console.log(games, "APPHOME");
    return(
            <div className="gamesWrapper">

                <h1 className="title ">Trend e novità sui MIGLIORI Giochi</h1>

                <p>Scopri nuovi giochi, i tred del momento e divertiti a confrontarli</p>

                <div className="gameList ">
                    {games.map((game) => (
                        <GameUI key={game.id} game={game} />
                    ))}
                </div>     

                {loading && <article aria-busy="true" className="loading"></article>}
            </div>
        
    )
}

export default AppHome