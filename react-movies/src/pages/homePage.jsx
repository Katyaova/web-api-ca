import React from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";


const HomePage = (props) => {

  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['discover'],
    queryFn: getMovies,
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true 

  const mustWatch = movies.filter((m) => m.mustWatch)
  localStorage.setItem("mustwatch", JSON.stringify(mustWatch))
  const addToMustWatch = (movieId) => true;


  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => (
        <>
          <AddToFavoritesIcon movie={movie} />
          <AddToPlaylistIcon movie={movie} />
        </>
      )}
    />
  );
};
export default HomePage;

