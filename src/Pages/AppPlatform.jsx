/* eslint-disable react-hooks/exhaustive-deps */
import GameUI from "../Components/GameUI"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

export default function AppPlatform(){
    const { platform_slug } = useParams();
    const [platform, setPlatform] = useState([]);
    const[loading, setLoading] = useState(false);

    useEffect(() =>{
        async function getPlatform() {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}games/?key=${import.meta.env.VITE_API_KEY}&platforms=${platform_slug}`);
            const json = await response.json();
            setPlatform(json)
            setLoading(false);
        }
        getPlatform()
    }, [platform_slug]);
   
    return(
        <div className="gamesWrapper">

            <h1 className="title">Platform: {platform_slug}</h1>

            <div className="gameList ">
                {platform.map((game) => (
                    <GameUI key={game.id} game={game} />
                ))}
            </div>     

            {loading && <article aria-busy="true" className="loading"></article>}
        </div>
    )
}