const express = require("express");
const path = require("path");
const fs = require("fs");
const Fuse = require("fuse.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));

// Load local medical FAQ knowledge base
const faqPath = path.join(__dirname, "data", "medical_faq.json");
const faqs = JSON.parse(fs.readFileSync(faqPath, "utf-8"));

// More forgiving fuzzy search (better matching)
const fuse = new Fuse(faqs, {
  keys: ["q", "tags", "a"],
  includeScore: true,
  threshold: 0.6,
  ignoreLocation: true,
  minMatchCharLength: 2,
});

function containsEmergencySignals(text) {
  const t = (text || "").toLowerCase();
  const redFlags = [
    "chest pain",
    "difficulty breathing",
    "shortness of breath",
    "fainting",
    "unconscious",
    "severe bleeding",
    "stroke",
    "face drooping",
    "slurred speech",
    "one-sided weakness",
    "seizure",
    "suicidal",
    "severe allergic",
    "anaphylaxis",
    "swelling of lips",
    "swelling of tongue",
  ];
  return redFlags.some((k) => t.includes(k));
}

function baseDisclaimer() {
  return "⚠️ I’m Swastha Setu Assistant. I can provide general health information, not a diagnosis. If symptoms are severe or worsening, consult a doctor.";
}

function emergencyMessage() {
  return "🚑 If you have chest pain, trouble breathing, fainting, severe bleeding, stroke signs, or severe allergic reaction, seek emergency care immediately.";
}

function formatAnswer(userMessage, matchItem) {
  if (containsEmergencySignals(userMessage)) {
    return `${emergencyMessage()}\n\n${baseDisclaimer()}`;
  }

  if (!matchItem) {
    return (
      `${baseDisclaimer()}\n\n` +
      "I couldn’t find a confident answer in my local knowledge base.\n" +
      "Try asking using keywords like: “headache”, “fever”, “hydration”, “cold”."
    );
  }

  return `${baseDisclaimer()}\n\n${matchItem.a}`;
}

// Chat API
app.post("/api/chat", (req, res) => {
  let message = (req.body?.message || "").trim();
  if (!message) return res.status(400).json({ reply: "Please type a question." });

  // Normalize message for better matching (removes punctuation)
  const normalized = message.toLowerCase().replace(/[^a-z0-9\s]/g, " ");

  const results = fuse.search(normalized);
  const best = results.length ? results[0] : null;
  const bestItem = best ? best.item : null;

  let reply = formatAnswer(message, bestItem);

  // If search is weak, show suggestions (still helpful)
  if (best && best.score > 0.65) {
    const suggestions = results
      .slice(0, 3)
      .map((r) => `• ${r.item.q}`)
      .join("\n");

    reply =
      `${baseDisclaimer()}\n\n` +
      "I’m not fully sure, but here are the closest topics I found:\n" +
      (suggestions || "• (No suggestions found)") +
      "\n\nTry asking like: “headache”, “fever home care”, “cold symptoms”, “hydration tips”.";
  }

  return res.json({ reply });
});

app.listen(PORT, () => {
  console.log(`Swastha Setu running at http://localhost:${PORT}`);
});