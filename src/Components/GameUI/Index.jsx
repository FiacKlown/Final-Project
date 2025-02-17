/* eslint-disable react/prop-types */
import { Link } from "react-router";
import gameStyle from "../../css/gameStyle.module.css";
import GameImage from "./components/gameImage";

export default function GameUI({ game }) {
  const { background_image: image } = game;
  return (
    <Link to={`/game/${game.id}`} className={gameStyle.cardLink}>
      <article className={gameStyle.articleCard}>
        <GameImage image={image} />
        <h5 className={gameStyle.textCenter}>{game.name}</h5>
        <p className={gameStyle.txtColor}>
          {game.genres.map((genre) => genre.name).join(", ")}
        </p>
      </article>
    </Link>
  );
}
