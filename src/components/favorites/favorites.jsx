import { useEffect, useState } from "react";
import { getFavorites, removeFavoriteByMessageId } from "../../services/favoriteService";

const Favorites = () => {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  const load = async () => {
    try {
      setErr("");
      const data = await getFavorites();
      setItems(data);
    } catch (e) {
      setErr(e.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleRemove = async (messageId) => {
    try {
      setErr("");
      await removeFavoriteByMessageId(messageId);
      // refresh list
      setItems((prev) => prev.filter((f) => f.messageId?._id !== messageId));
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <main className="card">
      <h1 className="h1">Favorites</h1>
      {err && <p>{err}</p>}

      {items.length === 0 ? (
        <p>No favorites yet ⭐</p>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {items.map((fav) => (
            <div key={fav._id} className="card">
              <p style={{ fontSize: 18, margin: 0 }}>
                {fav.messageId?.text}
              </p>

              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                <button
                  className="btn btn-red"
                  onClick={() => handleRemove(fav.messageId?._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Favorites;
