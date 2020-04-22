import fetch from "isomorphic-fetch";
import { API } from "../config";
import { handleResponse } from "../actions/auth";

export const emailContactForm = (data) => {
  let emailEndpoint;
  
  if (data.authorEmail) {
    emailEndpoint = `${API}/contact-blog-author`;
  } else {
    emailEndpoint = `${API}/contact`;
  }

  return fetch(emailEndpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      'Content-Type': "application/json",
    },
    body: JSON.stringify(data)
  })
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((err) => err);
};
