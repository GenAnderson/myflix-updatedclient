// import { UserState } from "../interfaces";
import userReducer, {
  initialState,
  setUser,
  setToken,
  clearUser,
} from "../redux/userSlice";

const mockUser = {
  _id: "111111",
  Username: "testUser",
  Password: "testPassword",
  Email: "testUser@gmail.com",
  Birthday: "1990-01-01",
  FavoriteMovies: [],
};

describe("userSlice reducer", () => {
  it("should handle setUser", () => {
    const action = setUser(mockUser);

    const expectedState = {
      ...initialState,
      user: mockUser,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle setToken", () => {
    const action = setToken("12345asdf");

    const expectedState = {
      ...initialState,
      token: "12345asdf",
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it("should reset to initial state and clear local storage", () => {
    const filledState = {
      user: mockUser,
      token: "12345asdf",
      loading: false,
      error: null,
    };
    const localStorageMock = jest.spyOn(Storage.prototype, "clear");
    const action = clearUser();
    expect(userReducer(filledState, action)).toEqual(initialState);
    expect(localStorageMock).toHaveBeenCalledTimes(1);

    localStorageMock.mockRestore();
  });
});
