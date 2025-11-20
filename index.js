const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Log every incoming request (for debugging)
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Conversations route (supports /conversations and /api/conversations)
app.get(["/conversations", "/api/conversations"], (req, res) => {
  res.json([
    {
      id: "1",
      leadId: "Sarah L.",
      lastMessagePreview: "Hey! I'm curious about your coaching...",
      channel: "instagram",
      stage: "new",
      updatedAt: new Date().toISOString(),
    },
  ]);
});

// Messages GET (supports /messages and /api/messages)
app.get(["/messages", "/api/messages"], (req, res) => {
  res.json([
    {
      id: "m1",
      conversationId: req.query.conversationId || "1",
      from: "lead",
      text: "Hey! I've been following you for a while.",
      createdAt: new Date().toISOString(),
    },
  ]);
});

// Messages POST (supports /messages and /api/messages)
app.post(["/messages", "/api/messages"], (req, res) => {
  const { conversationId, text } = req.body;
  res.json({
    id: "m_temp",
    conversationId,
    from: "agent",
    text,
    createdAt: new Date().toISOString(),
  });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
const cors = require("cors");
app.use(cors({
  origin: ["https://your-lovable-app-id.lovable.app"],
  methods: ["GET", "POST"],
  credentials: true
}));
