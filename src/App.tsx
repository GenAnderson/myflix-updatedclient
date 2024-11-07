import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./redux/store";
import { setToken, setUser } from "./redux/userSlice";
import { fetchMovies } from "./redux/movieSlice";

import { SignUpView } from "./components/signup-view";
import { LoginView } from "./components/login-view";
import { MovieCard } from "./components/movie-card";
import { MovieView } from "./components/movie-view";
import { NavigationBar } from "./components/navigation-bar";
import { ProfileView } from "./components/profile/profile-view";
import { ProfileUpdate } from "./components/profile/profile-update";

import { UserProps } from "./interfaces";

import { Row, Col, Form, Spinner } from "react-bootstrap";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const apiDispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const token = useSelector((state: RootState) => state.user.token);
  const movies = useSelector((state: RootState) => state.movies.movies);

  const [movieTitle, setMovieTitle] = useState<string>("");
  const [updatedMovies, setUpdatedMovies] = useState(movies);

  useEffect(() => {
    const storedUser: UserProps = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null;
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      dispatch(setUser(storedUser));
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      apiDispatch(fetchMovies(token));
    }
  }, [token, apiDispatch]);

  useEffect(() => {
    const filteredMovies = movies.filter((movie) => {
      return movie.Title.toLocaleLowerCase().includes(movieTitle);
    });
    setUpdatedMovies(filteredMovies);
  }, [movieTitle, movies]);

  return (
    <BrowserRouter>
      <NavigationBar />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <div
                    style={{
                      backgroundImage: "url('/movieBG.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      alignItems: "center",
                      height: "100vh",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Col
                      md={5}
                      className="m-5 p-5"
                      style={{
                        backgroundColor: "#c9c9c9",
                        borderRadius: "1%",
                      }}
                    >
                      <SignUpView />
                    </Col>
                  </div>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" replace />
                ) : (
                  <div
                    style={{
                      backgroundImage: "url('/movieBG.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      alignItems: "center",
                      height: "100vh",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Col
                      md={5}
                      className="m-5 p-5"
                      style={{
                        backgroundColor: "#c9c9c9",
                        borderRadius: "1%",
                      }}
                    >
                      <LoginView />
                    </Col>
                  </div>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "100vh" }}
                  >
                    <Spinner animation="border" role="status" />
                  </Col>
                ) : (
                  <div
                    style={{
                      backgroundImage: "url('/mainbg.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      alignItems: "center",
                      minHeight: "100vh",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* <FilterMovie /> */}
                    <Form className="p-4">
                      <Form.Group controlId="formFilter">
                        <Form.Control
                          placeholder="Search Movies"
                          type="text"
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setMovieTitle(e.currentTarget.value)
                          }
                        />
                      </Form.Group>
                    </Form>
                    <Row style={{ width: "100vw" }}>
                      {updatedMovies.map((movie) => (
                        <Col
                          className="mb-4"
                          key={movie.id}
                          sm={4}
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                    </Row>
                  </div>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "100vh" }}
                  ></Col>
                ) : (
                  <Col
                    md={8}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundImage: "url('/mainbg.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      minHeight: "100vh",
                      width: "100vw",
                    }}
                  >
                    <MovieView />
                  </Col>
                )}
              </>
            }
          />

          {/* Profile  */}
          <Route
            path="/profile"
            element={
              <>{!user ? <Navigate to="/login" replace /> : <ProfileView />}</>
            }
          />
          <Route
            path="/profile/update"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={4}>
                    <ProfileUpdate />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
}

export default App;
