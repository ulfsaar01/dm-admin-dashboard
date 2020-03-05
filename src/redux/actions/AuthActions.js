import { Auth } from 'aws-amplify'
import axios from "axios";
import {
  USER_VALID,
  USER_INVALID
} from '../../constants/AuthActionsConstants'

const getHeaders = () => {
  const token = localStorage.getItem("userParseSessionToken")
    ? localStorage.getItem("userParseSessionToken")
    : undefined;
  const headers = {
    "Content-Type": "application/json",
    "X-Parse-Application-Id": process.env.REACT_APP_APPID
  };

  if (token) {
    headers["X-Parse-Session-Token"] = token;
  }
  return headers;
};

export const api = async (functionName, body, method = "POST") => {
  const url = `${process.env.REACT_APP_SERVER_URL}${functionName}`;
  const appendant = {
    method,
    headers: getHeaders(),
    body
  };
  let response = await fetch(url, appendant);
  return response.json();
};

export const sendBase64File = async (signedUrl, base64, file) => {
  debugger;
  try {
    const result = await axios.put(signedUrl, base64, {
      headers: {
        "Content-Type": file.type,
        "Content-Encoding": "base64"
      }
    });
    debugger
    return result;
  } catch (e) {
    debugger
    console.log(e);
  }
};

export const validateUser = () => dispatch => {
  const token = localStorage.getItem("userParseSessionToken")
    ? localStorage.getItem("userParseSessionToken")
    : undefined;
  
  const user = localStorage.getItem("user")
    ? localStorage.getItem("user")
    : undefined;

  if (token && user) {
    dispatch({ type: USER_VALID, user:JSON.parse(user) })
  } else {
    dispatch({ type: USER_INVALID })
  }
}

export const login = (username, password) => async dispatch => {
  console.log('[Parse][AuthActions] Logging In: ' + username)
  const body = JSON.stringify({
    username,
    password
  });

  localStorage.removeItem("userParseSessionToken");
  localStorage.removeItem("user")

  let data = await api("logInWithEmail1", body);
  
  if(data.error) {
    throw data.error
  } else {
    const user = data.result;
    console.log(user)
    localStorage.setItem("userParseSessionToken", user.sessionToken);
    localStorage.setItem("user", JSON.stringify(user))
    dispatch({ type: USER_VALID, user:user })
  }
}

export const logout = history => {
  return dispatch => {
    console.log('[Parse][AuthActions] Logging Out')

    localStorage.removeItem("userParseSessionToken");
    localStorage.removeItem("user")
    //Auth.signOut()
  }
}