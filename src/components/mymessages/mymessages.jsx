import { useEffect, useState } from "react";
import {
  getMyMessages,
  createMessage,
  updateMessage,
  deleteMessage,
} from "../../services/motivationService";

import { addFavorite } from "../../services/favoriteService";

const MyMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // add form
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);

  // edit state
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [busyId, setBusyId] = useState(null); 

  const loadMessages = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await getMyMessages();
      const list = Array.isArray(data) ? data : (data.messages || data.data || []);
      setMessages(list);
    } catch (err) {
      setError(err?.message || "Failed to load messages");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const clean = text.trim();
    if (!clean) return setError("Please write a message first.");

    try {
      setError("");
      setSaving(true);
      await createMessage({ text: clean });
      setText("");
      await loadMessages();
    } catch (err) {
      setError(err?.message || "Failed to add message");
    } finally {
      setSaving(false);
    }
  };

  //  favorite
  const handleFavorite = async (id) => {
    try {
      setError("");
      setBusyId(id);
      await addFavorite(id);
      alert("Added to favorites ⭐");
    } catch (err) {
      setError(err?.message || "Failed to add favorite");
    } finally {
      setBusyId(null);
    }
  };

  //  start edit
  const startEdit = (msg) => {
    setError("");
    setEditingId(msg._id);
    setEditText(msg.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  // ✅ save edit
  const saveEdit = async (id) => {
    const clean = editText.trim();
    if (!clean) return setError("Message cannot be empty.");

    try {
      setError("");
      setBusyId(id);
      await updateMessage(id, { text: clean });
      setEditingId(null);
      setEditText("");
      await loadMessages();
    } catch (err) {
      setError(err?.message || "Failed to update message");
    } finally {
      setBusyId(null);
    }
  };

  //  delete
  const handleDelete = async (id) => {
    const ok = confirm("Delete this message?");
    if (!ok) return;

    try {
      setError("");
      setBusyId(id);
      await deleteMessage(id);
      await loadMessages();
    } catch (err) {
      setError(err?.message || "Failed to delete message");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <main className="card">
      <h2 className="h1">My Messages</h2>

      {error && <p style={{ color: "salmon" }}>{error}</p>}

      {/* ➕ Add form */}
      <form onSubmit={handleAdd} className="card" style={{ marginBottom: 16 }}>
        <label style={{ display: "block", marginBottom: 8, color: "rgba(233,238,245,0.72)" }}>
          Add a new message
        </label>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="Write something kind…"
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 12,
            border: "1px solid rgba(191,162,107,0.28)",
            background: "rgba(10, 30, 48, 0.45)",
            color: "white",
            outline: "none",
            resize: "vertical",
          }}
        />

        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <button className="btn" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Add Message"}
          </button>
          <button className="btn btn-red" type="button" onClick={() => setText("")} disabled={saving}>
            Clear
          </button>
        </div>
      </form>

      {/* 📃 List */}
      {loading ? (
        <p>Loading...</p>
      ) : messages.length === 0 ? (
        <p>No messages yet</p>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {messages.map((msg) => (
            <div key={msg._id} className="card">
              {editingId === msg._id ? (
                <>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={3}
                    style={{
                      width: "100%",
                      padding: 12,
                      borderRadius: 12,
                      border: "1px solid rgba(191,162,107,0.28)",
                      background: "rgba(10, 30, 48, 0.45)",
                      color: "white",
                      outline: "none",
                      resize: "vertical",
                    }}
                  />
                  <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                    <button
                      className="btn"
                      type="button"
                      onClick={() => saveEdit(msg._id)}
                      disabled={busyId === msg._id}
                    >
                      {busyId === msg._id ? "Saving..." : "Save"}
                    </button>
                    <button className="btn btn-red" type="button" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p style={{ fontSize: 18, margin: 0 }}>{msg.text}</p>
                  <p style={{ margin: "10px 0 0", fontSize: 12, color: "rgba(233,238,245,0.72)" }}>
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ""}
                  </p>

                  <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
                    <button
                      className="btn"
                      type="button"
                      onClick={() => handleFavorite(msg._id)}
                      disabled={busyId === msg._id}
                    >
                      {busyId === msg._id ? "..." : "★ Favorite"}
                    </button>

                    <button className="btn" type="button" onClick={() => startEdit(msg)}>
                      ✏️ Edit
                    </button>

                    <button
                      className="btn btn-red"
                      type="button"
                      onClick={() => handleDelete(msg._id)}
                      disabled={busyId === msg._id}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default MyMessages;
