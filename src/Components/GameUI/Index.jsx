/* eslint-disable react/prop-types */
import { Link } from "react-router";
import style from "./style.module.css";
import GameImage from "./components/GameImage";

export default function GameUI({ game }) {
  const { background_image: image } = game;
  return (
    <Link to={`/game/${game.id}`} className={`${style.cardLink}`}>
      <article className={`${style.game} ${style.articleCard}`}>
        <GameImage image={image} />
        <h5 className={style.textCenter}>{game.name}</h5>
        <p className={`${style.txtColor}`}>
          {game.genres.map((genre) => genre.name).join(", ")}
        </p>
      </article>
    </Link>
  );
}
