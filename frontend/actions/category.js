import fetch from "isomorphic-fetch";
import { API } from "../config";

export const create = (category, token) => {
    return fetch(`${API}/category`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(category),
    })
      .then((response) => response.json())
      .catch((err) => err);
  };