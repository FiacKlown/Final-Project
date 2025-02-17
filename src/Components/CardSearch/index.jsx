/* eslint-disable react/prop-types */
import cardStyle from "../../css/cardStyle.module.css";
import { Link } from "react-router";

export default function CardSearch({ game, closeDialog }) {
  const { name, background_image } = game;

  const handleClick = () => {
    closeDialog();
  };

  return (
    <Link to={`/game/${game.id}`} className={cardStyle.cardLink} onClick={handleClick}>
      <div className={cardStyle.cardResult}>
        <img
          className={cardStyle.imgAvatarResult}
          src={background_image}
          alt="image suggestions"
        />
        <small>{name}</small>
      </div>
    </Link>
  );
}
