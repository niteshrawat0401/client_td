import { 
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, 
    SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, 
    LOGOUT 
  } from "../action/authAction";
  
  const initialState = {
    loading: false,
    user: null,
    token: localStorage.getItem("token") || null,
    error: null,
  };
  
  export const authReducer = (state = initialState, action) => {
    console.log(action.payload)
    switch (action.type) {
      case LOGIN_REQUEST:
      case SIGNUP_REQUEST:
        return { ...state, loading: true, error: null };
  
      case LOGIN_SUCCESS:
      case SIGNUP_SUCCESS:
        return { ...state, loading: false, user: action.payload.user, token: action.payload.token };
  
      case LOGIN_FAILURE:
      case SIGNUP_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      case LOGOUT:
        return { ...state, user: null, token: null };
  
      default:
        return state;
    }
  };
  