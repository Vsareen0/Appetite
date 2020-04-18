import fetch from "isomorphic-fetch";
import { API } from "../config";

export const create = (blog, token) => {
  return fetch(`${API}/blog`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: blog
  })
    .then((response) => response.json())
    .catch((err) => err);
};

export const listBlogsWithCategoriesAndTags = (blog, token) => {
  return fetch(`${API}/blogs-categories-tags`, {
    method: "POST",
    headers: {
      Accept: "application/json"
    }
  })
    .then((response) => response.json())
    .catch((err) => err);
};