import { Link } from "react-router-dom";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

import { AddFavorite } from "./favorites/add-favorite";
import { DeleteFavorite } from "./favorites/delete-favorite";
import { MovieType } from "../interfaces";
import { Card } from "react-bootstrap";

export const MovieCard = ({
  movie: { id, ImagePath, Title },
}: {
  movie: MovieType;
}) => {
  const user = useSelector((state: RootState) => state.user.user);

  const userFavs = user?.FavoriteMovies;

  return (
    <Card
      className="h-100"
      bg="dark"
      style={{
        width: "100%",
      }}
    >
      <Link
        to={`/movies/${encodeURIComponent(id)}`}
        style={{
          textDecoration: "none",
          height: "100%",
          width: "100%",
        }}
      >
        <Card.Img
          variant="top"
          src={ImagePath}
          style={{ height: "100%", objectFit: "cover", width: "100%" }}
        />
      </Link>
      <Card.Body
        className="d-flex justify-content-between align-items-center"
        style={{ minHeight: "5rem" }}
      >
        <Link
          to={`/movies/${encodeURIComponent(id)}`}
          style={{ textDecoration: "none", color: "#fff" }}
        >
          <Card.Title>{Title}</Card.Title>{" "}
        </Link>
        {userFavs?.includes(id) ? (
          <DeleteFavorite movieId={id} />
        ) : (
          <AddFavorite movieId={id} />
        )}
      </Card.Body>
    </Card>
  );
};
