import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SAVE_TOKEN,
  CLEAR_TOKEN,
  CHECK_VERIFY_REQUEST,
  CHECK_VERIFY_SUCCESS,
  CHECK_VERIFY_FAIL,
  ADMIN_VERIFY_REQUEST,
  ADMIN_VERIFY_SUCCESS,
  ADMIN_VERIFY_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        // "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });

    dispatch({
      type: SAVE_TOKEN,
      payload: data.token,
    });

    localStorage.setItem("token", data.token);
    alert("Login successful");
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response ? error.response.data.error : "An error occurred",
    });
    alert(error.response.data.error);
    window.location.reload();
  }
};

// Register user
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: {
        // "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/auth/register`,
      userData,
      config
    );

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response
        ? error.response.data.message
        : "An error occurred",
    });
  }
};

//check verify
export const checkVerify = () => async (dispatch, getState) => {
  const token = localStorage.getItem("token");

  console.log("TOKEN >?>>>>>>>>>>", token);
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await dispatch({ type: CHECK_VERIFY_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/userVerify/check`,
      config
    );

    dispatch({
      type: CHECK_VERIFY_SUCCESS,
      payload: data.verify_status,
    });
  } catch (error) {
    console.error("CHECK VERIFY ERROR:", error);
    dispatch({
      type: CHECK_VERIFY_FAIL,
      payload: error.response
        ? error.response.data.message
        : "An error occurred",
    });
  }
};
//ADMIN route=> get verification submit data
export const getUserVerify = () => async (dispatch, getState) => {
  const token = localStorage.getItem("token");

  console.log("TOKEN >?>>>>>>>>>>", token);
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await dispatch({ type: ADMIN_VERIFY_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/userVerify`,
      config
    );

    dispatch({
      type: ADMIN_VERIFY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("CHECK VERIFY ERROR:", error);
    dispatch({
      type: ADMIN_VERIFY_FAIL,
      payload: error.response
        ? error.response.data.message
        : "An error occurred",
    });
  }
};

// Load user
export const loadUser = () => async (dispatch, getState) => {
  const token = localStorage.getItem("token");
  console.log("TOKEN >?>>>>>>>>>>", token);
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/auth/me`,
      config
    );

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      await dispatch(logout());
      return;
    }
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response
        ? error.response.data.message
        : "An error occurred",
    });
  }
};

// Update profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/auth/me/update`,
      userData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response
        ? error.response.data.message
        : "An error occurred",
    });
  }
};

// Update password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/auth/password/update`,
      passwords,
      config
    );

    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response
        ? error.response.data.message
        : "An error occurred",
    });
  }
};

// Forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/auth/password/forgot`,
      email,
      config
    );

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response
        ? error.response.data.message
        : "An error occurred",
    });
  }
};

// Reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/auth/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({
      type: NEW_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_PASSWORD_FAIL,
      payload: error.response
        ? error.response.data.message
        : "An error occurred",
    });
  }
};

// Logout user
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/auth/logout`);

    await dispatch({
      type: LOGOUT_SUCCESS,
    });
    await dispatch({
      type: CLEAR_TOKEN,
    });
    localStorage.removeItem("token");
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response
        ? error.response.data.message
        : "An error occurred",
    });
  }
};

// Get all users
export const allUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });

    const { data } = await axios.get("/api/v1/admin/users");

    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.response
        ? error.response.data.message
        : "An error occurred",
    });
  }
};

// Update user - ADMIN
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/admin/user/${id}`,
      userData,
      config
    );

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response
        ? error.response.data.message
        : "An error occurred",
    });
  }
};

// Get user details - ADMIN
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/user/${id}`);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response
        ? error.response.data.message
        : "An error occurred",
    });
  }
};

// Delete user - ADMIN
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response
        ? error.response.data.message
        : "An error occurred",
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
