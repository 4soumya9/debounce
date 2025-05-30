import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import MovieList from "./MovieList";
import useDebounce from "./useDebounce";

const TmdbSearchApp = () => {
  const [query, setQuery] = useState("");
  //   const [debouncedQuery, setDebouncedQuery] = useState("");
  const debouncedQuery = useDebounce(query, 5000);
  //   const [delay, setDelay] = useState(600);
  //   const debouncedQuery = useDebounce(query, delay);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const TMDB_API_KEY = "8cc9e4e6ab723fce9981d3668c9f6d3d";

  //   useEffect(() => {
  //     console.log("Typing:", query); // fires on every keystroke
  //     const timer = setTimeout(() => {
  //       setDebouncedQuery(query);
  //       console.log("Debounced Query Set:", query); // after 500ms of inactivity
  //     }, 5000);
  //     return () => {
  //       console.log("Clearing timeout"); // shows when debounce resets
  //       clearTimeout(timer);
  //     };
  //   }, [query]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!debouncedQuery) {
        setMovies([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${debouncedQuery}`
        );
        const data = await res.json();
        setMovies(data.results);
      } catch (error) {
        console.error(error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [debouncedQuery]);

  return (
    <div>
      <SearchInput value={query} onChange={setQuery} />
      {loading ? <p> loading</p> : <MovieList movies={movies} />}
    </div>
  );
};

export default TmdbSearchApp;

// 🧠 Why You See clearTimeout First
// When query changes (i.e., when you type something), the useEffect runs again.
//  But before it sets a new timeout, React cleans up the previous one — this is where clearTimeout(timer) is triggered.
