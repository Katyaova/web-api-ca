import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

const MovieCredits = ({ id }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["credits", id],
    queryFn: () => getMovieCredits(id),
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const topCast = data?.cast?.slice(0, 10) || [];

  return (
    <Paper
      elevation={2}
      sx={{
        padding: 3,
        margin: 2,
        backgroundColor: "#f4fff6",
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: "#2e7d32", fontWeight: 600 }}
      >
        Top Billed Cast
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <List>
        {topCast.map((actor) => (
          <ListItem
            key={actor.id}
            sx={{
              borderBottom: "1px solid #e0e0e0",
              paddingY: 2,
            }}
          >
            <Avatar
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w92${actor.profile_path}`
                  : ""
              }
              alt={actor.name}
              sx={{
                width: 56,
                height: 56,
                marginRight: 2,
                border: "2px solid #81c784",
              }}
            />
            <ListItemText
              primary={
                <Link
                  href={`https://www.themoviedb.org/person/${actor.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  sx={{ color: "#388e3c", fontWeight: 500 }}
                >
                  {actor.name}
                </Link>
              }
              secondary={
                <Typography variant="body2" color="text.secondary">
                  as {actor.character}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default MovieCredits;