const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// TEST ROUTES 
// These let your frontend load real data instead of mock JSON.

app.get("/conversations", (req, res) => {
  res.json([
    {
      id: "1",
      leadId: "Sarah L.",
      lastMessagePreview: "Hey! I'm curious about your coaching...",
      channel: "instagram",
      stage: "new",
      updatedAt: new Date().toISOString()
    }
  ]);
});

app.get("/messages", (req, res) => {
  res.json([
    {
      id: "m1",
      conversationId: req.query.conversationId || "1",
      from: "lead",
      text: "Hey! I've been following you for a while.",
      createdAt: new Date().toISOString()
    }
  ]);
});

app.post("/messages", (req, res) => {
  const { conversationId, text } = req.body;
  res.json({
    id: "m_temp",
    conversationId,
    from: "agent",
    text,
    createdAt: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
