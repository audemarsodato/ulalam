
export default function IngredientsList({ ingredients }) {

        const displayIngredients = ingredients.map(ingredient => (
                <label>
                        <input type="checkbox"/>
                        {ingredient}
                </label>
        ))

        return (
                <section className="ingredients-checklist">
                        <div className="header">
                                <h1>INGREDIENTS</h1>
                                <div className="ingredients-container">
                                        { displayIngredients }
                                </div>
                        </div>
                </section>
        )
}