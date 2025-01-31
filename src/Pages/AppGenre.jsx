/* eslint-disable react-hooks/exhaustive-deps */
import GameUI from "../Components/GameUI"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

export default function AppGenre(){
    const { genre_slug } = useParams();
    const [genre, setGenre] = useState([]);
    const[loading, setLoading] = useState(false);

    useEffect(() =>{
        async function getData() {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&genres=${genre_slug}`);
            const json = await response.json();
            setGenre(json.results)
            setLoading(false);
        }
        getData()
    }, [genre_slug]);

    return(
        <div className="gamesWrapper">

            <h1 className="title">Genre: {genre_slug}</h1>

            <div className="gameList ">
                {genre.map((game) => (
                    <GameUI key={game.id} game={game} />
                ))}
            </div>     

            {loading && <article aria-busy="true" className="loading"></article>}
        </div>
    )
}