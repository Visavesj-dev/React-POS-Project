import {
  LOGIN_FETCHING,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT
} from "../constants";
import { server } from "../constants";
import { httpClient } from "./../utils/HttpClient";
import jwt from "jsonwebtoken";

// Information being sent to Reducer
export const setLoginStateToFetching = () => ({
  type: LOGIN_FETCHING
});

export const setLoginStateToFailed = () => ({
  type: LOGIN_FAILED
});

export const setLoginStateToSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload
});

export const setLoginStateToLogout = () => ({
  type: LOGOUT
});

// Called by Login Component
export const login = (value, history) => {
  return async dispatch => {
    try {
      dispatch(setLoginStateToFetching()); // fetching
      let result = await httpClient.post(server.LOGIN_URL, value);
      if (result.data.result == "ok") {
        localStorage.setItem(server.TOKEN_KEY, result.data.token);
        localStorage.setItem(
          server.REFRESH_TOKEN_KEY,
          result.data.refreshToken
        );

        dispatch(setLoginStateToSuccess(result));
        history.push("/stock");
      } else {
        dispatch(setLoginStateToFailed());
      }
    } catch (error) {
      dispatch(setLoginStateToFailed());
    }
  };
};

export const logout = history => {
  return dispatch => {
    localStorage.removeItem(server.TOKEN_KEY);
    dispatch(setLoginStateToLogout());
    history.push("/login");
  };
};

export const isLoggedIn = () => {
  try {
    let token = localStorage.getItem(server.TOKEN_KEY);
    if (token) {
      var decodedToken = jwt.decode(token, { complete: true });
      var dateNow = new Date();

      if (decodedToken.exp < dateNow.getTime()) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};
