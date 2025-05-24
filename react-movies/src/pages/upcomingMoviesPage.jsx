import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUpcomingMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";


import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";

const UpcomingMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["upcoming"],
    queryFn: getUpcomingMovies,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={data.results}
    
      action={(movie) => <AddToPlaylistIcon movie={movie} />}
    />
  );
};

export default UpcomingMoviesPage;

