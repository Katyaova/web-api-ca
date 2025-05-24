import React, { useContext } from "react";
import { getMovie } from "../api/tmdb-api";
import { MoviesContext } from "../contexts/moviesContext";
import PageTemplate from "../components/templateMovieListPage";
import { useQueries } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist"; 

const MustWatchMoviesPage = () => {
  const { mustWatch: movieIds } = useContext(MoviesContext);

  const mustWatchQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ['movie', { id: movieId }],
        queryFn: getMovie,
      };
    })
  });

  const isPending = mustWatchQueries.some((q) => q.isPending);

  if (isPending) return <Spinner />;

  const movies = mustWatchQueries.map((q) => {
    
    q.data.genre_ids = q.data.genres.map((g) => g.id);
    return q.data;
  });

  return (
    <PageTemplate
      title="My Must Watch Playlist"
      movies={movies}
      action={(movie) => <AddToPlaylistIcon movie={movie} />}
    />
  );
};

export default MustWatchMoviesPage;
