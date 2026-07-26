import { useState, useRef } from "react"

import Ingredient from "../components/Ingredient"

export default function UlalmForm({ mode, ulamData, handleSubmit }) {
        const [ imageSRC, setImageSRC ] = useState(null)
        const [ ingredients, setIngredients ]  = useState([])

        const [ showSubmit, setShowSubmit ] = useState(true)
        
        const [ ingredient, setIngredient ] = useState('')
        const addIngredient = () => {
                if (!ingredient) return

                setIngredients(current => [...current, ingredient])
                setIngredient('')
        }

        const textAreaRef = useRef(null)
        const autoResizeTextarea = (event) => {
                const textarea = textAreaRef.current

                textarea.style.height = 'auto' // reset
                textarea.style.height = `${textarea.scrollHeight}px`
        }

        const setPreview = (event) => {
                const file = event.target.files[0]

                const imageSRC = URL.createObjectURL(file) // Creates an image in memory that can be access using url

                setImageSRC(imageSRC)
        }

        const removePreview = () => {
                setImageSRC(null)
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
                <form className="ulam-form">
                        <div className="ulam-name section">
                                <p className="label">Ulam Name</p>
                                <input 
                                        type="text"
                                        onBlur={() => setShowSubmit(true)}
                                        onFocus={() => setShowSubmit(false)}
                                />
                        </div>

                        <div className="photo section">
                                <p className="label">Photo</p>

                                {!imageSRC ?
                                        <label className="add-photo-placeholder" htmlFor="ulam-photo">
                                                <span className="material-symbols-rounded icon">
                                                        restaurant
                                                </span>
                                                <p>Add a Photo</p>
                                        </label>
                                :
                                        <div className="preview-image">
                                                <img src={imageSRC}/>
                                                <button type="button" onClick={removePreview}>
                                                        <span class="material-symbols-rounded">
                                                                close
                                                        </span>
                                                </button>
                                        </div>
                                }
                                <input 
                                        id="ulam-photo" 
                                        type="file" 
                                        accept="image/*" 
                                        loading="lazy"
                                        onChange={setPreview} 
                                        hidden 
                                />
                        </div>

                        <div className="ingredients section">
                                <p className="label">Ingredients</p>

                                <div className="ingredients-form">
                                        <input 
                                                type="text" 
                                                value={ingredient} 
                                                onChange={(event) => setIngredient(event.target.value)}
                                                onBlur={() => setShowSubmit(true)}
                                                onFocus={() => setShowSubmit(false)}
                                        />
                                        <button type="button" onClick={addIngredient}>Add</button>
                                </div>

                                <div className="ingredients-container">
                                        {displayIngredients}
                                </div>
                        </div>

                        <div className="instructions section">
                                <p className="label">Instructions</p>
                                <textarea 
                                        rows={5} 
                                        ref={textAreaRef}
                                        onChange={autoResizeTextarea}
                                        onBlur={() => setShowSubmit(true)}
                                        onFocus={() => setShowSubmit(false)}
                                ></textarea>
                        </div>

                        {showSubmit &&
                                <div className="submit">
                                        <button type="submit">PUBLISH ULAM</button>
                                </div>
                        }
                </form>
        )
}