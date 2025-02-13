/* eslint-disable react/prop-types */
import style from "./style.module.css";
import { Link } from "react-router";

export default function CardSearch({ game, closeDialog }) {
  const { name, background_image } = game;

  const handleClick = () => {
    closeDialog();
  };

  return (
    <Link to={`/game/${game.id}`} className={`${style.cardLink}`} onClick={handleClick}>
      <div className={style.cardResult}>
        <img
          className={style.imgAvatarResult}
          src={background_image}
          alt="image suggestions"
        />
        <small>{name}</small>
      </div>
    </Link>
  );
}
