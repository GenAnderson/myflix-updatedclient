import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { clearUser } from "../../redux/userSlice";

import { Button } from "react-bootstrap";
// import { LogoutProps } from "../../interfaces";

export const DeleteProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const token = useSelector((state: RootState) => state.user.token);

  // const storedToken = localStorage.getItem("token");

  const deleteProfileHandler = () => {
    if (!user) {
      return;
    }
    fetch(`https://movieapi-yazx.onrender.com/users/${user.Username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.ok) {
          alert("Profile deleted");
          dispatch(clearUser());
          navigate("/login", { replace: true });
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => alert("Something went wrong: " + error));
  };

  return (
    <div>
      <Button variant="outline-danger my-2" onClick={deleteProfileHandler}>
        Delete Profile
      </Button>
    </div>
  );
};
