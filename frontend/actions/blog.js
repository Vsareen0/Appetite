import fetch from "isomorphic-fetch";
import { API } from "../config";
import queryString from "querystring";
import { isAuth, handleResponse } from "./auth";

export const create = (blog, token) => {
  let createEndPoint;
  if (isAuth() && isAuth().role == 1) {
    createEndPoint = `${API}/blog`;
  } else if (isAuth() && isAuth().role == 0) {
    createEndPoint = `${API}/user/blog`;
  }

  return fetch(createEndPoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((err) => err);
};

export const listBlogsWithCategoriesAndTags = (skip, limit) => {
  const data = {
    limit,
    skip,
  };
  return fetch(`${API}/blogs-categories-tags`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((err) => err);
};

export const singleBlog = (slug) => {
  return fetch(`${API}/blog/${slug}`, {
    method: "GET",
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const listRelated = (blog) => {
  return fetch(`${API}/blogs/related`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const list = (username) => {
  let listBlogsEndpoint;
  if (username) {
    listBlogsEndpoint = `${API}/${username}/blogs`;
  } else {
    listBlogsEndpoint = `${API}/blogs`;
  }

  return fetch(`${listBlogsEndpoint}`, {
    method: "GET",
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const removeBlog = (slug, token) => {
  let deleteEndPoint;
  if (isAuth() && isAuth().role == 1) {
    deleteEndPoint = `${API}/blog/${slug}`;
  } else if (isAuth() && isAuth().role == 0) {
    deleteEndPoint = `${API}/user/blog${slug}`;
  }

  return fetch(`${deleteEndPoint}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((err) => err);
};

export const updateBlog = (blog, token, slug) => {
  let updateEndPoint;
  if (isAuth() && isAuth().role == 1) {
    updateEndPoint = `${API}/blog/${slug}`;
  } else if (isAuth() && isAuth().role == 0) {
    updateEndPoint = `${API}/user/blog/${slug}`;
  }

  return fetch(`${updateEndPoint}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((err) => err);
};

export const listSearch = (params) => {
  let query = queryString.stringify(params);
  // console.log("q: ", query);
  return fetch(`${API}/blogs/search?${query}`, {
    method: "GET",
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
