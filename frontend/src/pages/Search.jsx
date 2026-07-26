import { useState } from 'react'

import Header from '../components/Header'
import Ingredient from '../components/Ingredient'

export default function Search() {
        const [ mode, setMode ] = useState('ulam')

        const [ ingredient, setIngredient ] = useState('')
        const [ ingredients, setIngredients ] = useState(['Sibuyas', 'Bawang', 'Kamatis'])

        const addIngredient = (event) => {
                event.preventDefault()

                setIngredients(current => [...current, ingredient])
                setIngredient('')
        }

        const removeIngredient = (target) => {
                setIngredients(current => current.filter(ingredient => ingredient !== target))
        }

        const displayIngredients = ingredients.map(ingredient => 
                <Ingredient 
                        key={ingredient}
                        name={ingredient} 
                        remove={() => removeIngredient(ingredient)}
                />
        )

        return (
                <section className="search-page">
                        <Header pageTitle={'Search'}/>

                        <form className="search-form" onSubmit={addIngredient}>
                                <input
                                        type="text"
                                        placeholder='Search'
                                        value={ingredient}
                                        onChange={(event) => setIngredient(event.target.value)}
                                />
                                <button type='submit'>
                                        <span className="material-symbols-rounded">
                                                {mode === 'ulam' ? 'add_circle_outline' : 'search'}
                                        </span>
                                </button>
                        </form>

                        <div className="mode-selection">
                                <div className={`option ${mode === 'ulam' ? 'active' : ''}`}>
                                        <label htmlFor="ulam">Ulam</label>
                                        <input 
                                                type="radio" 
                                                id='ulam'
                                                name="mode" 
                                                value="ulam"
                                                checked={mode === 'ulam'} // react controlls the checked radiobutton
                                                onChange={(event) => setMode(event.target.value)}
                                                hidden
                                        />
                                </div>

                                <div className={`option ${mode === 'people' ? 'active' : ''}`}>
                                        <label htmlFor="people">People</label>
                                        <input 
                                                type="radio" 
                                                id='people'
                                                name="mode" 
                                                value="people"
                                                checked={mode === 'people'}
                                                onChange={(event) => setMode(event.target.value)}
                                                hidden
                                        />
                                </div>
                        </div>

                        {/* {mode === 'ulam' &&
                                <div className="empty-state-placeholder">
                                        <p>Search using available ingredients</p>
                                </div>
                        } */}

                        <div className="ingredients-section">
                                <h2>Available ingrdients</h2>
                                <div className="ingredients-container">
                                        {displayIngredients}
                                </div>
                        </div>
                </section>
        )
}