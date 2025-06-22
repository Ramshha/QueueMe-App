import React, { useState, useEffect } from "react";
import "./App.scss";

type QueueUser = {
  id: number;
  name: string;
};

const API_URL = "http://localhost:4000";

function App() {
  const [queue, setQueue] = useState<QueueUser[]>([]);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchQueue = async () => {
    const res = await fetch(`${API_URL}/queue`);
    const data = await res.json();
    setQueue(data);
  };

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 5000);
    return () => clearInterval(interval);
  }, []);

  const checkIn = async () => {
    if (!name.trim()) return alert("Enter your name");
    setLoading(true);
    const res = await fetch(`${API_URL}/queue`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });

    if (res.ok) {
      const newUser: QueueUser = await res.json();
      setUserId(newUser.id);
      setName("");
      fetchQueue();
    } else {
      alert("Failed to add to queue.");
    }

    setLoading(false);
  };

  const callNext = async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/queue/next`, {
      method: "DELETE"
    });

    if (res.ok) {
      fetchQueue();
    } else {
      alert("Queue is empty.");
    }

    setLoading(false);
  };

  const deleteUser = async (id: number) => {
  if (!window.confirm("Are you sure you want to remove this user from the queue?")) return;

  setLoading(true);
  const res = await fetch(`${API_URL}/queue/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    // If current user deleted themselves, clear userId
    if (id === userId) {
      setUserId(null);
    }
    await fetchQueue();
  } else {
    alert("Failed to delete user");
  }
  setLoading(false);
};

  const userPosition = userId
    ? queue.findIndex((u) => u.id === userId) + 1
    : null;

  return (
  <div className="container">
    <h2>Queue Management App</h2>

    <div style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        disabled={loading}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={checkIn}
        disabled={loading}
        className="check-in"
      >
        Check In
      </button>
    </div>

    {userId && userPosition !== 0 && userPosition !== null && (
      <p>Current queue length: <strong style={{ color: "#0097A7" }}>{userPosition}</strong></p>
    )}

    <button onClick={callNext} disabled={loading} className="call-next">
      Call Next
    </button>

    <h3>Current Queue:</h3>
    <ol>
      {queue.map((user) => (
        <li
          key={user.id}
          className={user.id === userId ? "highlight" : ""}
        
        >
          {user.name}
          
        <button className="delete-btn"
        onClick={() => deleteUser(user.id)} 
        disabled={loading}
        style={{ marginLeft: "20px" }}>
          Remove
        </button>
        </li>
      ))}
    </ol>
  </div>
);
}

export default App;
