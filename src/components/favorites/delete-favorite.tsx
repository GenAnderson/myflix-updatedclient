import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/userSlice";

import { Button } from "react-bootstrap";
import { FavoriteProps } from "../../interfaces";

export const DeleteFavorite = ({ movieId }: FavoriteProps) => {
  const apiDispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const token = useSelector((state: RootState) => state.user.token);

  const deleteFavoriteHandler = () => {
    fetch(
      `https://movieapi-yazx.onrender.com/users/${user?.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Movie deleted from favorites");
          apiDispatch(updateUser());
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => alert("Something went wrong: " + error));
  };

  return (
    <Button variant="dark me-1 mb-1" size="sm" onClick={deleteFavoriteHandler}>
      <svg
        fill="#95080F"
        width="1.4rem"
        height="1.4rem"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z" />
      </svg>
    </Button>
  );
};
