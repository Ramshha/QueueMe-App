import express from "express";
import cors from "cors";

type QueueUser = {
  id: number;
  name: string;
};

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let queue: QueueUser[] = [];

// Get queue
app.get("/queue", (req, res) => {
  res.json(queue);
});

// Add to queue
app.post("/queue", (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "Name is required" });
  }

  const newUser: QueueUser = {
    id: Date.now(),
    name: name.trim()
  };

  queue.push(newUser);
  res.status(201).json(newUser);
});

// Delete user by ID
app.delete("/queue/next", (req, res) => {
  console.log("Queue before calling next:", queue);

  if (queue.length === 0) {
    console.log("Error: Queue is empty.");
    return res.status(400).json({ error: "Queue is empty" });
  }

  const nextUser = queue.shift();
  console.log("Next user called:", nextUser);
  res.json(nextUser);
});

// Call next
app.delete("/queue/next", (req, res) => {
  if (queue.length === 0) {
    return res.status(400).json({ error: "Queue is empty" });
  }

  const nextUser = queue.shift();
  res.json(nextUser);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
