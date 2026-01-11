import ClaudeRecipe from "./ClaudeRecipe"
import React from "react"
import IngredientsList from "./IngredientsList"
import { getRecipeFromAI } from "../ai"

export default function Main() {
    const [loading, setLoading] = React.useState(false)

    const [ingredients, setIngredients] = React.useState([])



    const [recipe, setRecipe] = React.useState("")

    async function getRecipe() {
        setLoading(true)
        const recipeMarkdown = await getRecipeFromAI(ingredients)
        setRecipe(recipeMarkdown)
        setLoading(false)
    }
    function removeIngredient(indexToRemove) {
        setIngredients(prev =>
            prev.filter((_, index) => index !== indexToRemove)
        )
    }


    function addIngredient(formdata) {
        const newIngredient = formdata.get("ingredient")
        setIngredients(prevIngredient => [...prevIngredient, newIngredient])



    }
    return (
        <>
            <main>
                <form className="form-add-ingredient" action={addIngredient}>
                    <input type="text" placeholder="e.g. oregano" name="ingredient">
                    </input>
                    <button className="btn-add-ingredient">
                        Add ingredient
                    </button>
                </form>
                {ingredients.length > 0 &&
                    <IngredientsList
                        ingredients={ingredients}
                        getRecipe={getRecipe}
                        loading={loading}
                        removeIngredient={removeIngredient}
                    />

                }


                {loading && (
                    <div className="loading">
                        Nida is thinking wait for a few seonds ...
                    </div>
                )}

                {!loading && recipe && (
                    <ClaudeRecipe recipe={recipe} />
                )}

            </main>
        </>
    )
}