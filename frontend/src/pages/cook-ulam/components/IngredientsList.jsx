import '../CookUlam.css'

export default function IngredientsList({ ingredients }) {

        const displayIngredients = ingredients.map(ingredient => (
                <label className='ingredient'>
                        <input type="checkbox"/>
                        {ingredient}
                </label>
        ))

        return (
                <section className="ingredients-checklist">
                        <div className="header">
                                <h1>Ingredients</h1>
                        </div>

                        <div className="ingredients-container">
                                { displayIngredients }
                        </div>
                </section>
        )
}