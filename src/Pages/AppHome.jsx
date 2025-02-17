import { useEffect } from "react";
import GameUI from "../components/gameUI/index.jsx";
import { useInView } from "react-intersection-observer";
import useGames from "../hooks/useGames";
import homeStyle from "../css/homeStyle.module.css"


function AppHome() {
  const { games, loading } = useGames();

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (games.items.length && inView && !games.isLoading) {
      games.loadMore();
    }
  }, [inView, games]);

  return (
    <div className={homeStyle.gamesWrapper}>
      <h1 className="title">Trends and news of the BEST Games</h1>
      <p className={homeStyle.paddingL}>
        Discover new games, current trends and have fun chatting in real time
        with other users
      </p>
      <div className={homeStyle.gameList}>
        {games.items.map((game) => (
          <GameUI key={game.id} game={game} />
        ))}
      </div>
      <div ref={ref}>
        {loading && (
          <article aria-busy="true" className={homeStyle.loadingBg}></article>
        )}
      </div>
    </div>
  );
}

export default AppHome;
