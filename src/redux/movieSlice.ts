import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MovieType, MovieApiResponse, MovieState } from "../interfaces";
import { RootState } from "./store";

export const fetchMovies = createAsyncThunk<
  MovieType[],
  string,
  { state: RootState }
>("movies/fetchMovies", async (token) => {
  const response = await fetch("https://movieapi-yazx.onrender.com/movies", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data: MovieApiResponse[] = await response.json();
  const movies = data.map((movie) => ({
    id: movie._id,
    Title: movie.Title,
    ImagePath: movie.ImagePath,
    Description: movie.Description,
    DirectorName: movie.Director.Name,
    DirectorBio: movie.Director.Bio,
    DirectorBirth: movie.Director.Birth,
    GenreName: movie.Genre.Name,
    GenreDescription: movie.Genre.Description,
  }));
  return movies;
});

const initialState: MovieState = {
  movies: [],
  error: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch movies";
      });
  },
});

export default movieSlice.reducer;
