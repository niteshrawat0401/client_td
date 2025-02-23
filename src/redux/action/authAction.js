import axios from "axios";
import apiUrl from "../../config"

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const LOGOUT = "LOGOUT";

const API_URL = apiUrl;
// console.log(import.meta.env)

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const response = await axios.post(`${API_URL}api/users/login`, { email, password });
      
      localStorage.setItem("token", JSON.stringify(response.data));
      
      dispatch({type: LOGIN_SUCCESS,payload: response.data,});
    } catch (error) {
        dispatch({type: LOGIN_FAILURE,payload: error || "Login failed",
      });
    }
  };
};

// Signup Action
export const signup = (name, email, password) => {
  return async (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST });

    try {
      const response = await axios.post(`${API_URL}api/users/register`, { name, email, password });

      localStorage.setItem("token", response.data.token);

      dispatch({type: SIGNUP_SUCCESS,payload: response.data,});
      return response.data;
    } catch (error) {
      dispatch({type: SIGNUP_FAILURE,payload: error.response?.data?.message || "Signup failed",
      });
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  };
};

// Logout Action
export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT });
  };
};
