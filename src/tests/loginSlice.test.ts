import { LoginState } from "../interfaces";
import loginReducer, {
  initialState,
  setUsername,
  setPassword,
  setLoading,
  clearLoginState,
} from "../redux/loginSlice";

describe("loginSlice reducer", () => {
  it("should handle setUsername", () => {
    const action = setUsername("mockUser");

    const expectedState: LoginState = {
      ...initialState,
      username: "mockUser",
    };

    expect(loginReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle setPassword", () => {
    const action = setPassword("mockPassword");

    const expectedState: LoginState = {
      ...initialState,
      password: "mockPassword",
    };

    expect(loginReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle setIsLoading", () => {
    const action = setLoading(true);

    const expectedState: LoginState = {
      ...initialState,
      isLoading: true,
    };

    expect(loginReducer(initialState, action)).toEqual(expectedState);
  });

  it("should clear login states", () => {
    const action = clearLoginState();

    const filledState: LoginState = {
      username: "mockUser",
      password: "mockPassword",
      isLoading: true,
    };

    const expectedState: LoginState = {
      username: "",
      password: "",
      isLoading: false,
    };

    expect(loginReducer(filledState, action)).toEqual(expectedState);
  });
});
