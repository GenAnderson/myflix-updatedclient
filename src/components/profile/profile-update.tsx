import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { clearUser } from "../../redux/userSlice";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const ProfileUpdate = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const token = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Bday = user?.Birthday.split("T")[0];
  const [username, setUsername] = useState(user?.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user?.Email);
  const [birthday, setBirthday] = useState(Bday);

  if (!user) {
    return <div>Loading...</div>;
  }

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
      FavoriteMovies: user.FavoriteMovies,
    };

    fetch(`https://movieapi-yazx.onrender.com/users/${user.Username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          alert("Updated profile successfully.  Please login again");
          dispatch(clearUser());
          navigate("/login", { replace: true });
        } else {
          alert("Update failed");
        }
      })
      .catch((error) => alert("Update failed" + error));
  };

  return (
    <div>
      <Form onSubmit={onSubmitHandler}>
        <h3 className="profileUpdate--heading">Profile Settings</h3>

        <Form.Group controlId="changeUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="changePassword">
          <Form.Label>Re-enter Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="changeEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="changeBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>

        <div>
          <Button type="submit" variant="dark my-2">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};
