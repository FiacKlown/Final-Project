import { useParams } from "react-router"
import { useState, useEffect } from "react";
import GameImage from "../Components/GameUI/components/GameImage";

export default function AppDetail(){
    const { id } = useParams();
    const [game, setGame] = useState({});

    useEffect(() =>{
            async function getGame() {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}games/${id}?key=${import.meta.env.VITE_API_KEY}`);
            const json = await response.json();
            setGame(json)
        }
        getGame()
     }, []);

    return(
        <div className="game_detail_wrapper">
            <div className="game_info">
                <h1>{game.name}</h1>
                <button className="contrast">Aggiungi ai favoriti</button>
                <p>Insfo sul ranking</p>
                <p>{game.rating }</p>
                <button>Vai alla review</button>
                <h3>About</h3>
                <small>{game.description_raw}</small>
            </div>
            <div className="game_media">
                <GameImage image={game.background_image}/>
                <GameImage image={game.background_image_additional}/>
            </div>

        </div>
    )
}