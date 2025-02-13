// src/hooks/useGames.js
import { useAsyncList } from "react-stately";
import { useState } from "react";

const useGames = () => {
  const [loading, setLoading] = useState(false);

  const games = useAsyncList({
    async load({ signal, cursor }) {
      setLoading(true);
      const res = await fetch(
        cursor ||
          `${import.meta.env.VITE_API_BASE_URL}games?key=${
            import.meta.env.VITE_API_KEY
          }&dates=2023-01-01,2024-01-01&page=1`,
        {
          signal,
        }
      );
      const json = await res.json();
      setLoading(false);
      return {
        items: json.results,
        cursor: json.next,
      };
    },
  });

  return {
    games,
    loading,
  };
};

export default useGames;
