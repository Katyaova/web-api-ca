import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieVideos } from "../../api/tmdb-api";
import Spinner from "../spinner";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const MovieTrailers = ({ id }) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["videos", id],
    queryFn: () => getMovieVideos(id),
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const trailers =
    data?.results?.filter(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    ) || [];

  if (!trailers.length)
    return (
      <Typography variant="body1" sx={{ padding: 2 }}>
        No trailers found.
      </Typography>
    );

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        margin: 2,
        backgroundColor: "#f1fff4",
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: "#2e7d32", fontWeight: 600 }}
      >
        Trailer{trailers.length > 1 ? "s" : ""}
      </Typography>

      {trailers.map((trailer) => (
        <Box key={trailer.id} sx={{ mb: 4 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 500, color: "#388e3c", mb: 1 }}
          >
            {trailer.name}
          </Typography>
          <Box
            sx={{
              position: "relative",
              paddingBottom: "56.25%", 
              height: 0,
              overflow: "hidden",
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "8px",
              }}
            />
          </Box>
        </Box>
      ))}
    </Paper>
  );
};

export default MovieTrailers;