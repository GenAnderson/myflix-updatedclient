import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  setUsername,
  setPassword,
  setLoading,
  clearLoginState,
} from "../redux/loginSlice";
import { setToken, setUser } from "../redux/userSlice";

import { Spinner, Nav } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const LoginView = () => {
  const dispatch = useDispatch();
  const { username, password, isLoading } = useSelector(
    (state: RootState) => state.login
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(setLoading(true));

    const data = {
      Username: username,
      Password: password,
    };

    /**
     * Change CORs on movie API if site doesn't have permission
     *   */

    fetch("https://movieapi-yazx.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setLoading(false));
        // console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          dispatch(setUser(data.user));
          dispatch(setToken(data.token));
        } else {
          alert("Username or Password is incorrect");
        }
      })
      .catch(() => {
        dispatch(setLoading(false));
        alert("Something went wrong. Try again later.");
      });
  };

  useEffect(() => {
    // Clear login state when component mounts
    dispatch(clearLoginState());
  }, [dispatch]);

  return (
    <Form onSubmit={handleSubmit}>
      LOGIN
      <Form.Group controlId="formUsernameLogin">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => dispatch(setUsername(e.target.value))}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPasswordLogin">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
          required
        />
      </Form.Group>
      <Button type="submit" variant="dark my-2" disabled={isLoading}>
        {isLoading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />{" "}
            Loading...
          </>
        ) : (
          "Submit"
        )}
      </Button>
      <div>
        <Nav.Link
          as={Link}
          to="/signup"
          style={{ textDecoration: "underline", display: "inline" }}
        >
          Don't have an account? Signup for free!
        </Nav.Link>
      </div>
    </Form>
  );
};
