import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { MovieCard } from "../movie-card";
import { Row, Col } from "react-bootstrap";

export const ViewFavorites = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const movies = useSelector((state: RootState) => state.movies.movies);

  const FavMovies = user?.FavoriteMovies;
  const favorites = movies.filter((m) => FavMovies?.includes(m.id));

  return (
    <div className="m-4">
      <h5>Favorites </h5>
      <Row md={4}>
        {favorites.map((movie) => (
          <Col
            key={movie.id}
            style={{ listStyle: "none", margin: ".2rem 0rem" }}
          >
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
