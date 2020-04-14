import fetch from "isomorphic-fetch";
import { API } from "../config";

export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => err);
};

export const signin = (user) => {
    return fetch(`${API}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .catch((err) => err);
  };