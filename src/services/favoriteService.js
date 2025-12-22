const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/favorites`;

const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

export async function getFavorites() {
  const res = await fetch(BASE_URL, { headers: authHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch favorites");
  return data; // array
}

export async function addFavorite(messageId) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ messageId }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to add favorite");
  return data; // { message, favorite }
}



export async function removeFavoriteByMessageId(messageId) {
  const res = await fetch(`${BASE_URL}/${messageId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to remove favorite");
  return data; // { message, favorite }
}
