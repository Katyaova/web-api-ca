import React, { useContext } from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";
import { MoviesContext } from "../../contexts/moviesContext";

const AddToPlaylistIcon = ({ movie }) => {
  const { addToMustWatch } = useContext(MoviesContext); 

  const handleAdd = (e) => {
    e.preventDefault();
    addToMustWatch(movie); 
  };

  return (
    <IconButton aria-label="add to must watch" onClick={handleAdd}>
      <PlaylistAddIcon color="primary" />
    </IconButton>
  );
};

export default AddToPlaylistIcon;
