import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_ACCESS_TOKEN);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { ingredients } = req.body;

  if (!ingredients || !ingredients.length) {
    return res.status(400).json({ error: "No ingredients provided" });
  }

  try {
    const response = await hf.chatCompletion({
      model: "HuggingFaceH4/zephyr-7b-beta",
      provider: "featherless-ai",
      messages: [
        {
          role: "system",
          content:
            "You are a cooking assistant. Suggest a recipe in markdown."
        },
        {
          role: "user",
          content: `I have ${ingredients.join(", ")}.`
        }
      ],
      max_tokens: 600
    });

    res.status(200).json({
      recipe: response.choices[0].message.content
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI failed" });
  }
}
