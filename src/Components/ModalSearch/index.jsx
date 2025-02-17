/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import CardSearch from "../cardSearch";
import cardStyle from "../../css/searchStyle.module.css"

export default function ModalSearch({ focus, handleClickOverlay }) {
  const [search, setSearch] = useState("");
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeoutApi = setTimeout(() => {
      async function SearchedGame() {
        if (!search) return;
        setGames([]);
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}games?key=${
            import.meta.env.VITE_API_KEY
          }&page=1&search=${search}`
        );
        const json = await response.json();
        setGames(json.results);
        setLoading(false);
      }
      SearchedGame();
    }, 1500);

    return () => {
      clearTimeout(timeoutApi);
    };
  }, [search]);

  const closeDialog = () => {
    handleClickOverlay();
  };

  const getMostSimilarGame = () => {
    if (!games.length) return null;

    return games.reduce((prev, curr) => {
      return curr.name.toLowerCase().includes(search.toLowerCase()) &&
        curr.name.length < prev.name.length
        ? curr
        : prev;
    });
  };

  const similarGame = getMostSimilarGame();

  return (
    <dialog open={focus}>
      <article className={cardStyle.artSearch}>
        <header>
          <button aria-label="Close" rel="prev" onClick={closeDialog}></button>
          <h3>Search a game</h3>
        </header>
        <input
          type="search"
          name="search"
          value={search}
          placeholder="Search"
          aria-label="Search"
          onChange={(event) => setSearch(event.target.value)}
        />

        <div className={cardStyle.cardSearchWrapper}>
          {loading && <article aria-busy="true"></article>}
          {games &&
            games.map((game) => (
              <CardSearch key={game.id} game={game} closeDialog={closeDialog} />
            ))}
        </div>

        <footer>
          {similarGame ? (
            <button
              onClick={() => (window.location.href = `/game/${similarGame.id}`)}
            >
              Go to Most Similar Game: {similarGame.name}
            </button>
          ) : (
            <button disabled>No similar game found</button>
          )}
        </footer>
      </article>
    </dialog>
  );
}
