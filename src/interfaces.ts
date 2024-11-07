export interface UserProps {
  _id: string;
  Username: string;
  Birthday: string;
  Email: string;
  FavoriteMovies: string[];
  Password: string;
}

// Movie
export interface Director {
  Name: string;
  Bio: string;
  Birth: string;
}

export interface Genre {
  Name: string;
  Description: string;
}

export interface MovieApiResponse {
  _id: string;
  Title: string;
  ImagePath: string;
  Description: string;
  Director: Director;
  Genre: Genre;
}

export interface MovieType {
  id: string;
  Title: string;
  ImagePath: string;
  Description: string;
  DirectorName: string;
  DirectorBio: string;
  DirectorBirth: string;
  GenreName: string;
  GenreDescription: string;
}

// Profile settings
export interface ProfileUpdateProps {
  user: UserProps;
  token: string | null;
  onLoggedOut: () => void;
}

export interface FavoriteProps {
  movieId: string;
}

// redux
export interface UserState {
  user: UserProps | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginState {
  username: string;
  password: string;
  isLoading: boolean;
}

export interface MovieState {
  movies: MovieType[];
  error: string | null;
}
