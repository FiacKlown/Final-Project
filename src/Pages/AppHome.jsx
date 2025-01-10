import { useAsyncList } from "react-stately";
import { useEffect, useState} from "react";
import GameUI from "../Components/GameUI";
import { useInView } from "react-intersection-observer";

function AppHome(){
    const[loading, setLoading] = useState(false);

    const games = useAsyncList({
        async load({ signal, cursor }) {
            setLoading(true);
            const res = await fetch(cursor || `${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&dates=2023-01-01,2024-01-01&page=1`, {
                signal
            });
            const json = await res.json();
            setLoading(false);
            return {
                items: json.results,
                cursor: json.next
            };
        }
    });

    const { ref, inView } = useInView({
        threshold: 1,
    })

    useEffect(() =>{
        if(games.items.length && inView && !games.isLoading){
            games.loadMore();
        }
    }, [inView, games])


    return(
            <div className="gamesWrapper">
                
                <h1 className="title ">Trend e novità sui MIGLIORI Giochi</h1>
                <p>Scopri nuovi giochi, i tred del momento e divertiti a confrontarli</p>
                <div className="gameList">
                    {games.items.map((game) => (
                        <GameUI key={game.id} game={game} />
                    ))}
                </div>     
                <div ref={ref}>
                    {loading && <article aria-busy="true" className="loading"></article>}
                </div>
            </div>
        
    )
}

export default AppHome