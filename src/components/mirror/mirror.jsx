import { useState } from "react";
import { getRandomMotivation } from "../../services/motivationService";

const Mirror = () => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAppleClick = async () => {
    try {
      setLoading(true);
      const data = await getRandomMotivation();
      setMessage(data.message); 
    } catch (err) {
      setMessage({ text: "Something went wrong…" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mirror-page">
      <h2 className="mirror-title">
        Mirror, mirror on the wall,<br />
        tell me something nice for today
      </h2>

      <div className="mirror-frame">
        <div className="mirror-glass">
          {!message && !loading && (
            <p className="mirror-placeholder">
              Tap the apple to reveal a message
            </p>
          )}

          {loading && <p className="mirror-placeholder">Listening…</p>}

          {message && (
            <p className="mirror-message">
              {message.text}
            </p>
          )}
        </div>
      </div>

      <button
        className="apple-btn"
        onClick={handleAppleClick}
        aria-label="Reveal message"
      >
        🍎
      </button>
    </div>
  );
};

export default Mirror;
