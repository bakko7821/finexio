import { Router } from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/emoji", async (req, res) => {
  try {
    const { name } = req.body;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `Подбери один подходящий эмодзи для категории "${name}". Верни только один emoji.`,
    });

    const emoji = response.output_text.trim();

    res.json({ emoji });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI error" });
  }
});

export default router;
