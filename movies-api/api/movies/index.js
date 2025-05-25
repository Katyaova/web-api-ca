import express from 'express';
import asyncHandler from 'express-async-Handler';
import {getMovies,  getUpcomingMovies, getTopRatedMovies, getMovieCredits, 
    getMovieVideos, getPopularMovies, getNowPlayingMovies, getMovie, getGenres, 
    getMovieImages, getMovieReviews, getMovieRecommendations} from '../tmdb-api';

const router = express.Router();

router.get('/discover', asyncHandler(async (req, res) => {
  const discoverMovies = await getMovies();
  res.status(200).json(discoverMovies);
}));

router.get('/:id/credits', asyncHandler(async (req, res) => {
  const data = await getMovieCredits(req.params.id);
  res.status(200).json(data);
}));

router.get('/:id/videos', asyncHandler(async (req, res) => {
  const data = await getMovieVideos(req.params.id);
  res.status(200).json(data);
}));


router.get('/upcoming', asyncHandler(async (req, res) => {
    const data = await getUpcomingMovies();
    res.status(200).json(data);
}));

router.get('/top', asyncHandler(async (req, res) => {
    const data = await getTopRatedMovies();
    res.status(200).json(data);
}));

router.get('/popular', asyncHandler(async (req, res) => {
  const data = await getPopularMovies();
  res.status(200).json(data);
}));


router.get('/now', asyncHandler(async (req, res) => {
    const data = await getNowPlayingMovies();
    res.status(200).json(data);
}));

router.get('/genres', asyncHandler(async (req, res) => {
  const data = await getGenres(); 
  res.status(200).json(data);
}));


router.get('/upcoming', asyncHandler(async (req, res) => {
    const data = await getUpcomingMovies();
    res.status(200).json(data);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const data = await getMovie({ queryKey: ["movie", { id: req.params.id }] });
  res.status(200).json(data);
}));

router.get('/:id/images', asyncHandler(async (req, res) => {
  const data = await getMovieImages({ queryKey: ["images", { id: req.params.id }] });
  res.status(200).json(data);
}));

router.get('/:id/reviews', asyncHandler(async (req, res) => {
  const data = await getMovieReviews({ queryKey: ["reviews", { id: req.params.id }] });
  res.status(200).json(data);
}));

router.get('/:id/recommendations', asyncHandler(async (req, res) => {
  const data = await getMovieRecommendations({ queryKey: ["recommendations", { id: req.params.id }] });
  res.status(200).json(data);
}));


export default router;
