import { useEffect, useState } from "react";
import { getRandomMotivation } from "../../services/motivationService";
import { addFavorite } from "../../services/favoriteService";

const Message = () => {
  const [msg, setMsg] = useState(null); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyFav, setBusyFav] = useState(false);

  const loadRandom = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await getRandomMotivation();
      setMsg(data.message);
    } catch (err) {
      setError(err?.message || "Failed to load message");
      setMsg(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRandom();
  }, []);

  const handleFavorite = async () => {
    if (!msg?._id) return;

    try {
      setBusyFav(true);
      await addFavorite(msg._id);
      alert("Added to favorites ⭐");
    } catch (err) {
      setError(err?.message || "Failed to add favorite");
    } finally {
      setBusyFav(false);
    }
  };

  return (
    <main className="card">
      <h1 className="h1">Your message</h1>

      {error && <p style={{ color: "salmon" }}>{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : msg ? (
        <p style={{ fontSize: 28, lineHeight: 1.4 }}>{msg.text}</p>
      ) : (
        <p>No message found</p>
      )}

      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <button className="btn" onClick={loadRandom}>
          New message
        </button>

        <button className="btn" onClick={handleFavorite} disabled={busyFav}>
          {busyFav ? "..." : "★ Favorite"}
        </button>
      </div>
    </main>
  );
};

export default Message;
