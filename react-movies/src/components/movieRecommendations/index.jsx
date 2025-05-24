import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieRecommendations } from "../../api/tmdb-api";
import Spinner from "../spinner";
import MovieList from "../movieList";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const MovieRecommendationsDrawer = ({ id }) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["recommendations", id],
    queryFn: () => getMovieRecommendations(id),
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <Paper
      elevation={2}
      sx={{
        padding: 3,
        margin: 2,
        backgroundColor: "#f0fdf4",
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: "#2e7d32",
          fontWeight: 600,
          textAlign: "center",
          marginBottom: 3,
        }}
      >
        Recommended Movies
      </Typography>

      <MovieList
        movies={data?.results || []}
        gridProps={{ xs: 6, sm: 4, md: 3, lg: 2, xl: 2 }}
      />
    </Paper>
  );
};

export default MovieRecommendationsDrawer;