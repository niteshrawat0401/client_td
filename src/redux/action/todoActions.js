import axios from "axios";
import apiUrl from "../../config";
import {
  GET_TODOS_REQUEST, GET_TODOS_SUCCESS, GET_TODOS_FAILURE,
  ADD_TODO_REQUEST, ADD_TODO_SUCCESS, ADD_TODO_FAILURE,
  UPDATE_TODO_REQUEST, UPDATE_TODO_SUCCESS, UPDATE_TODO_FAILURE,
  DELETE_TODO_REQUEST, DELETE_TODO_SUCCESS, DELETE_TODO_FAILURE
} from "./todoTypes";

const API_URL = apiUrl;

const userData = JSON.parse(localStorage.getItem("token"));

// Fetch All To-Dos
export const fetchTodos = () => async (dispatch, getState) => {
  let token = getState().auth?.token || userData?.token;
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  }
  dispatch({ type: GET_TODOS_REQUEST });

  try {
    const response = await axios.get(`${API_URL}api/todos`, header);
    // console.log(response.data.getAllTodo)
    dispatch({ type: GET_TODOS_SUCCESS, payload: response.data.getAllTodo });
  } catch (error) {
    dispatch({ type: GET_TODOS_FAILURE, payload: error.response?.data?.message || "Failed to fetch todos" });
  }
};

// Add a New To-Do
export const addTodo = (todoData) => async (dispatch, getState) => {
  let token = getState().auth?.token || userData?.token;
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  }
  dispatch({ type: ADD_TODO_REQUEST });
  try {
    const response = await axios.post(`${API_URL}api/todos`, todoData , header);
    dispatch({ type: ADD_TODO_SUCCESS, payload: response.data.newTodo
    });
  } catch (error) {
    console.log(error)
    dispatch({ type: ADD_TODO_FAILURE, payload: error.response?.data?.message || "Failed to add todo" });
  }
};

// Update a To-Do
export const updateTodo = (id, updatedData) => async (dispatch, getState) => {
  let token = getState().auth?.token || userData?.token;
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  }
  dispatch({ type: UPDATE_TODO_REQUEST });
  try {
    const response = await axios.put(`${API_URL}api/todos/${id}`, updatedData , header);
    dispatch({ type: UPDATE_TODO_SUCCESS, payload: response.data.updateTodo });
  } catch (error) {
    dispatch({ type: UPDATE_TODO_FAILURE, payload: error.response?.data?.message || "Failed to update todo" });
  }
};

// Delete a To-Do
export const deleteTodo = (id) => async (dispatch, getState) => {
  let token = getState().auth?.token || userData?.token;
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  }
  dispatch({ type: DELETE_TODO_REQUEST });
  try {
    await axios.delete(`${API_URL}api/todos/${id}`, header);
    dispatch({ type: DELETE_TODO_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_TODO_FAILURE, payload: error.response?.data?.message || "Failed to delete todo" });
  }
};
