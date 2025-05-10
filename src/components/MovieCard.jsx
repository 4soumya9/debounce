import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div>
      {movie.poster_path ? (
        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />
      ) : (
        <div> No img</div>
      )}
      <h2>{movie.title}</h2>
    </div>
  );
};

export default MovieCard;
