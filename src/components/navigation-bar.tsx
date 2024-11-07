import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { clearUser } from "../redux/userSlice";

import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <Navbar style={{ backgroundColor: "#c9c9c9" }} expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ display: "flex" }}>
          <img
            src="/movieIcon.png"
            alt="MyFlix logo"
            style={{ maxWidth: "1.6rem", marginRight: ".2rem" }}
          />
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  My profile
                </Nav.Link>
                <Nav.Link onClick={() => dispatch(clearUser())}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
