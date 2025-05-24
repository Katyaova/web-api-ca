import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTopRatedMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";

const TopRatedMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["topRated"],
    queryFn: getTopRatedMovies,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={data.results}
      action={() => null}
    />
  );
};

export default TopRatedMoviesPage;
