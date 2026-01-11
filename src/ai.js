// import { HfInference} from "@huggingface/inference"


// const SYSTEM_PROMPT = `
// You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients.
//  You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients.
//   Format your response in markdown to make it easier to render to a web page
// `
// const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN)

// export async function getRecipeFromMistral(ingredientsArr) {
//     const ingredientsString = ingredientsArr.join(", ")
//     try {
//         const response = await hf.chatCompletion({
//   model: "mistralai/Mistral-7B-Instruct-v0.2",
//   provider: "together",
//   messages: [
//     { role: "system", content: SYSTEM_PROMPT },
//     { role: "user", content: `I have ${ingredientsString}. Please give me a recipe.` }
//   ],
//   max_tokens: 800,
// })

//         return response.choices[0].message.content
//     } catch (err) {
//         console.error("HF ERROR",err)
//         return "sorry. ai busy right now"
//     }
// }

export async function getRecipeFromAI(ingredients) {
  const res = await fetch("/api/recipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients })
  });

  const data = await res.json();
  return data.recipe;
}

