// src/services/authService.js

// Use the `VITE_BACK_END_SERVER_URL` environment variable to set the base URL.
// Note the `/auth` path added to the server URL that forms the base URL for
// all the requests in this service.
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;
console.log("BACK END URL:", import.meta.env.VITE_BACK_END_SERVER_URL);
  const token = localStorage.getItem("token");



const signUp = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : {};

    if (!res.ok) {
      throw new Error(data.err || data.message || "Sign up failed");
    }

    if (data.err) {
      throw new Error(data.err);
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      return JSON.parse(atob(data.token.split(".")[1]));
    }

    throw new Error("Invalid response from server");
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const signIn = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : {};

    if (!res.ok) {
      throw new Error(data.err || data.message || "Sign in failed");
    }

    if (data.err) {
      throw new Error(data.err);
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      return JSON.parse(atob(data.token.split(".")[1]));
    }

    throw new Error("Invalid response from server");
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { signUp, signIn };
