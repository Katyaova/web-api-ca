import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import RecommendIcon from "@mui/icons-material/ThumbUpAlt";
import PeopleIcon from "@mui/icons-material/People";
import MovieIcon from "@mui/icons-material/Movie";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";

import MovieReviews from "../movieReviews";
import MovieRecommendations from "../movieRecommendations";
import MovieCredits from "../movieCredits";
import MovieTrailers from "../movieTrailers";

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
  backgroundColor: "#edf6f0",
  borderRadius: "8px",
  boxShadow: 1,
};

const chip = {
  margin: 0.5,
  backgroundColor: "#cdeacd",
  fontWeight: 500,
};

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [recDrawerOpen, setRecDrawerOpen] = useState(false);
  const [creditsDrawerOpen, setCreditsDrawerOpen] = useState(false);
  const [trailerDrawerOpen, setTrailerDrawerOpen] = useState(false);

  return (
    <>
      <Typography variant="h5" component="h3" sx={{ mb: 1, color: "#2e7d32" }}>
        Overview
      </Typography>

      <Typography variant="body1" component="p" sx={{ mb: 3 }}>
        {movie.overview}
      </Typography>

      <Paper component="ul" sx={{ ...root, mb: 2 }}>
        <li>
          <Chip label="Genres" sx={{ ...chip, backgroundColor: "#5C9A76", color: "#fff" }} />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={chip} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={{ ...root, mb: 2 }}>
        <li>
          <Chip
            label="Production Countries"
            sx={{ ...chip, backgroundColor: "#5C9A76", color: "#fff" }}
          />
        </li>
        {movie.production_countries.map((country) => (
          <li key={country.iso_3166_1}>
            <Chip label={country.name} sx={chip} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={{ ...root, mb: 4 }}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} sx={chip} />
        <Chip
          icon={<MonetizationIcon />}
          label={`$${movie.revenue.toLocaleString()}`}
          sx={chip}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
          sx={chip}
        />
        <Chip label={`Released: ${movie.release_date}`} sx={chip} />
      </Paper>

      {/* Reviews Button */}
      <Fab
        color="success"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: "fixed",
          bottom: "1em",
          right: "1em",
          zIndex: 1000,
        }}
      >
        <NavigationIcon sx={{ mr: 1 }} />
        Reviews
      </Fab>
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MovieReviews movie={movie} />
      </Drawer>

      {/* Recommendations Button */}
      <Fab
        color="primary"
        variant="extended"
        onClick={() => setRecDrawerOpen(true)}
        sx={{
          position: "fixed",
          bottom: "5em",
          right: "1em",
          zIndex: 1000,
          backgroundColor: "#66bb6a",
          "&:hover": { backgroundColor: "#4caf50" },
        }}
      >
        <RecommendIcon sx={{ mr: 1 }} />
        Recommendations
      </Fab>
      <Drawer
        anchor="top"
        open={recDrawerOpen}
        onClose={() => setRecDrawerOpen(false)}
      >
        <MovieRecommendations id={movie.id} />
      </Drawer>

      {/* Cast Button */}
      <Fab
        color="info"
        variant="extended"
        onClick={() => setCreditsDrawerOpen(true)}
        sx={{
          position: "fixed",
          bottom: "9em",
          right: "1em",
          zIndex: 1000,
          backgroundColor: "#81c784",
          "&:hover": { backgroundColor: "#66bb6a" },
        }}
      >
        <PeopleIcon sx={{ mr: 1 }} />
        Cast
      </Fab>
      <Drawer
        anchor="top"
        open={creditsDrawerOpen}
        onClose={() => setCreditsDrawerOpen(false)}
      >
        <MovieCredits id={movie.id} />
      </Drawer>

      {/* Trailer Button */}
      <Fab
        color="info"
        variant="extended"
        onClick={() => setTrailerDrawerOpen(true)}
        sx={{
          position: "fixed",
          bottom: "13em",
          right: "1em",
          zIndex: 1000,
          backgroundColor: "#a5d6a7",
          "&:hover": { backgroundColor: "#81c784" },
        }}
      >
        <MovieIcon sx={{ mr: 1 }} />
        Watch Trailer
      </Fab>
      <Drawer
        anchor="top"
        open={trailerDrawerOpen}
        onClose={() => setTrailerDrawerOpen(false)}
      >
        <MovieTrailers id={movie.id} />
      </Drawer>
    </>
  );
};

export default MovieDetails;