// src/services/motivationService.js

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/motivation`;

const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

export async function getRandomMotivation() {
  const res = await fetch(`${BASE_URL}/random`, {
    headers: authHeaders(),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to load message");
  return data;
}

export async function getMyMessages() {
  const res = await fetch(`${BASE_URL}/mine`, {
    headers: authHeaders(),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to load messages");
  return data;
}

export async function createMessage(body) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function updateMessage(id, body) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function deleteMessage(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return res.json();
}
