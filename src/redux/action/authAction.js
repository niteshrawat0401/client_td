import axios from "axios";

// Define action types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const LOGOUT = "LOGOUT";

// Backend API URL
const API_URL = "http://localhost:8000/";

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const response = await axios.post(`${API_URL}api/users/login`, { email, password });
      
      // Save token in localStorage
      localStorage.setItem("token", JSON.stringify(response.data));
      
      dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data,
        });
    } catch (error) {
        console.log(error.response?.data?.errors[0].msg)
        dispatch({
            type: LOGIN_FAILURE,
        payload: error.response?.data || "Login failed",
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
        console.log(response)
        
        // Save token in localStorage
        localStorage.setItem("token", response.data.token);
        
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
      dispatch({
        type: SIGNUP_FAILURE,
        payload: error?.response?.data || "Signup failed",
      });
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
