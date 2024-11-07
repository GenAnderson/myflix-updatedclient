import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { ViewFavorites } from "../favorites/view-favorites";
import { DeleteProfile } from "./profile-delete";

import { Row, Col, Form, Button, Container } from "react-bootstrap";

export const ProfileView = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const Bday = user?.Birthday.split("T")[0];

  return (
    <Container>
      {!user ? (
        <p>Cannot load user</p>
      ) : (
        <Row className="flex-shrink-0">
          <Col sm={4} className="m-4">
            <h5>MY PROFILE</h5>
            <Form>
              <Form.Group controlId="changeUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" value={user.Username} disabled />
              </Form.Group>

              <Form.Group controlId="changePassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" value={user.Password} disabled />
              </Form.Group>

              <Form.Group controlId="changeEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" value={user.Email} disabled />
              </Form.Group>

              <Form.Group controlId="changeBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control type="birthday" value={Bday} disabled />
              </Form.Group>

              <div className="profileView--btnsContainer">
                <Link to="./update">
                  <Button variant="dark my-2">Edit Profile</Button>
                </Link>

                <DeleteProfile />
              </div>
            </Form>
          </Col>

          <Col>
            <ViewFavorites />
          </Col>
        </Row>
      )}
    </Container>
  );
};
