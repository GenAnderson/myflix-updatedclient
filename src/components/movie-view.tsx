import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import { AddFavorite } from "./favorites/add-favorite";
import { DeleteFavorite } from "./favorites/delete-favorite";
import { Col, Button } from "react-bootstrap";

export const MovieView = () => {
  const { movieId } = useParams();
  const user = useSelector((state: RootState) => state.user.user);
  const movies = useSelector((state: RootState) => state.movies.movies);
  const FavoriteMovies = user?.FavoriteMovies;
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return <div>Movies currently unavailable</div>;
  }

  return (
    <Col
      md={6}
      className="p-4 m-4"
      style={{ backgroundColor: "#c9c9c9", borderRadius: "1%" }}
    >
      <div>
        <img
          className="movie-view--img"
          src={movie.ImagePath}
          style={{ width: "100%", objectFit: "cover" }}
        />
      </div>
      <div>
        <div
          style={{ textAlign: "center", padding: "1rem", fontWeight: "bold" }}
        >
          {movie.Title}
        </div>
        <div>Description: {movie.Description}</div>
      </div>
      <div className="movie-view--directorBox">
        <div>Director: {movie.DirectorName}</div>
        <div>Bio: {movie.DirectorBio}</div>
        <div>Birth: {movie.DirectorBirth}</div>
      </div>
      <div className="movie-view--genreBox">
        <div>Genre: {movie.GenreName}</div>
        <div>Genre description: {movie.GenreDescription}</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <Link to={`/`}>
          <Button variant="dark me-1" size="sm">
            Back
          </Button>
        </Link>

        {FavoriteMovies?.includes(movie.id) ? (
          <DeleteFavorite movieId={movie.id} />
        ) : (
          <AddFavorite movieId={movie.id} />
        )}
      </div>
    </Col>
  );
};
