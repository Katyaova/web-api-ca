import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [mustWatch, setMustWatch] = useState([]);

  
  const addToMustWatch = (movie) => {
    if (!mustWatch.some((m) => m.id === movie.id)) {
      setMustWatch([...mustWatch, movie.id]); 
    }
  };
  console.log(mustWatch)


  const addToFavorites = (movie) => {
    if (!favorites.includes(movie.id)) {
      setFavorites([...favorites, movie.id]);
    }
  };

  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter((mId) => mId !== movie.id));
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  const removeFromMustWatch = (movie) => {
    setMustWatch(mustWatch.filter((m) => m.id !== movie.id));
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,       
        addToMustWatch,
        mustWatch,
        myReviews,
        addReview,
        removeFromMustWatch,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;




