/* eslint-disable react-hooks/exhaustive-deps */
import GameUI from "../components/gameUI/index.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useInView } from "react-intersection-observer";
import genreStyle from "../css/genreStyle.module.css"

export default function AppGenre() {
  const { genre_slug } = useParams();
  const [genre, setGenre] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadGames = async () => {
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}games?key=${
        import.meta.env.VITE_API_KEY
      }&genres=${genre_slug}&page=${page}`
    );
    const json = await response.json();
    setGenre((prev) => [...prev, ...json.results]);
    setLoading(false);
  };
  useEffect(() => {
    setGenre([]);
    setPage(1);
    loadGames();
  }, [genre_slug]);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [inView, loading]);

  useEffect(() => {
    if (page > 1) {
      loadGames();
    }
  }, [page]);

  return (
    <div className={genreStyle.gamesWrapper}>
      <h1 className="title">Genre: {genre_slug}</h1>

      <div className={genreStyle.gameList}>
        {genre.map((game) => (
          <GameUI key={game.id} game={game} />
        ))}
      </div>

      {loading && (
        <article aria-busy="true" className={genreStyle.loadingBg}></article>
      )}

      <div ref={ref}></div>
    </div>
  );
}
