import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

const Header = (props) => {
  const title = props.title;
  const navigate = useNavigate();

  return (
    <Paper
      component="div"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        padding: "12px 24px",
        marginBottom: 2,
        borderRadius: 2,
        background: "linear-gradient(90deg, #5C9A76 0%, #9BCF9B 100%)",
        color: "#fff",
        boxShadow: 4,
      }}
    >
      <IconButton
        aria-label="go back"
        onClick={() => navigate(-1)}
        sx={{ color: "#ffffff" }}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>

      <Typography
        variant="h4"
        component="h3"
        sx={{ fontWeight: 600, textAlign: "center", flexGrow: 1 }}
      >
        {title}
      </Typography>

      <IconButton
        aria-label="go forward"
        onClick={() => navigate(+1)}
        sx={{ color: "#ffffff" }}
      >
        <ArrowForwardIcon fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default Header;
