const express = require("express");
const router = express.Router();
require("dotenv").config();

const OPENAI_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_KEY) {
  console.warn(
    "Warning: OPENAI_API_KEY not set — AI proxy will fail until configured",
  );
}

router.post("/", async (req, res) => {
  const { prompt, model = "gpt-4.1-mini", temperature = 0.7 } = req.body || {};
  if (!prompt) return res.status(400).json({ error: "Missing prompt" });

  try {
    const payload = {
      model,
      input: prompt,
      temperature,
    };

    const resp = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const txt = await resp.text();
      return res.status(502).json({ error: "OpenAI error", detail: txt });
    }

    const data = await resp.json();
    const text =
      data.output_text ||
      data.output?.[0]?.content?.map((c) => c.text).join("\n") ||
      "";
    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
