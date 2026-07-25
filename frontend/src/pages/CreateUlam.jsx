import { useState } from "react"

import Header from "../components/Header"
import Ingredient from "../components/Ingredient"

export default function CreateUlam() {
        const [ imageSRC, setImageSRC ] = useState(null)
        const [ ingredients, setIngredients ]  = useState(['Sibuyas', 'Bawang', 'Kamatis'])

        const setPreview = (event) => {
                // Input
                const file = event.target.files[0]

                // Process
                const imageSRC = URL.createObjectURL(file) // Creates an image in memory that can be access using url

                // Output
                setImageSRC(imageSRC)
        }

        const removePreview = () => {
                setImageSRC(null)
        }

        return (
                <section className="create-ulam-page">
                        <Header pageTitle={"Publish Ulam"} />

                        <form className="ulam-form">
                                <div className="ulam-name section">
                                        <p className="label">Ulam Name</p>
                                        <input type="text"/>
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
                                                <input type="text" />
                                                <button type="button">Add</button>
                                        </div>

                                        <div className="ingredients-container">
                                                {ingredients.map(ingredient => <Ingredient name={ingredient} />)}
                                        </div>
                                </div>

                                <div className="instructions section">
                                        <p className="label">Instructions</p>
                                        <textarea rows={5}></textarea>
                                </div>

                                <button type="submit">PUBLISH ULAM</button>
                        </form>
                </section>
        )
}