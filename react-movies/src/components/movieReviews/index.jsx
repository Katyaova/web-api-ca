import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router";
import { getMovieReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";
import Typography from "@mui/material/Typography";

export default function MovieReviews({ movie }) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["reviews", { id: movie.id }],
    queryFn: getMovieReviews,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const reviews = data.results;

  return (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: 2,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#f4fff6",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          padding: 2,
          paddingBottom: 0,
          color: "#2e7d32",
          fontWeight: 600,
        }}
      >
        Reviews
      </Typography>

      <Table sx={{ minWidth: 550 }} aria-label="reviews table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#5c9a76" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Author
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              Excerpt
            </TableCell>
            <TableCell
              align="right"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              More
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {reviews.map((r, index) => (
            <TableRow
              key={r.id}
              sx={{
                backgroundColor: index % 2 === 0 ? "#ffffff" : "#edf7f0",
              }}
            >
              <TableCell component="th" scope="row">
                <Typography variant="body1" fontWeight={500}>
                  {r.author}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {excerpt(r.content)}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Link
                  to={`/reviews/${r.id}`}
                  state={{ review: r, movie: movie }}
                  style={{
                    textDecoration: "none",
                    color: "#2e7d32",
                    fontWeight: 500,
                  }}
                >
                  Full Review →
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}