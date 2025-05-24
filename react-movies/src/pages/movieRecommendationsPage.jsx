import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieRecommendations } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMoviePage";

const MovieRecommendationsPage = () => {
  const { id } = useParams();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["recommendations", id],
    queryFn: () => getMovieRecommendations(id),
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <PageTemplate
      title="Recommended Movies"
      movies={data}
      action={() => null}
    />
  );
};

export default MovieRecommendationsPage;
