import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getNowPlayingMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";

const NowPlayingMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["nowPlaying"],
    queryFn: getNowPlayingMovies,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <PageTemplate
      title="Now Playing"
      movies={data.results}
      action={() => null}
    />
  );
};

export default NowPlayingMoviesPage;
