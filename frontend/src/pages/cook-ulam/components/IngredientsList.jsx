import '../CookUlam.css'

import CheckBox from '../../../components/checkbox/Checkbox'

export default function IngredientsList({ ingredients }) {

        const displayIngredients = ingredients.map(ingredient => (
                <CheckBox label={ingredient} className={'ingredient'}/>
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