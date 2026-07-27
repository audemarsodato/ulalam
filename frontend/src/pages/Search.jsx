import { useState } from 'react'

import Header from '../components/Header'
import Ingredient from '../components/Ingredient'
import UlamCardSearch from '../components/ulam_cards/UlamCardSearch'
import UserCard from '../components/UserCard'

export default function Search() {
        const [ mode, setMode ] = useState('ulam')

        const [ ingredient, setIngredient ] = useState('')
        const [ ingredients, setIngredients ] = useState([])

        const addIngredient = (event) => {
                event.preventDefault()

                if (!ingredient) return

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

                        {mode === 'ulam' && (
                                ingredients.length === 0 ? (
                                        <div className="empty-state-placeholder">
                                                <p>Search using available ingredients</p>
                                        </div>
                                ) : (
                                        <div className="results">
                                                <div className="ingredients-section">
                                                        <h2>Available ingrdients</h2>
                                                        <div className="ingredients-container">
                                                                {displayIngredients}
                                                        </div>
                                                </div>

                                                <div className="matched-ulams-section">
                                                        <h2>Match Found</h2>
                                                        <div className="ulam-container">
                                                                <UlamCardSearch ulamName={'Adobo'} matchCount={2} />
                                                                <UlamCardSearch ulamName={'Adobo'} matchCount={2} />
                                                                <UlamCardSearch ulamName={'Adobo'} matchCount={2} />
                                                                <UlamCardSearch ulamName={'Adobo'} matchCount={2} />
                                                                <UlamCardSearch ulamName={'Adobo'} matchCount={2} />
                                                        </div>
                                                </div>
                                        </div>
                                )
                        )}

                        {mode === 'people' && (
                                <div className="results people">
                                        <UserCard userName={'Audemars Odato'} followerCount={67} followingCount={12} profileURL={'https://scontent.fmnl9-6.fna.fbcdn.net/v/t39.30808-1/636768676_2340190826450286_1542923457919314152_n.jpg?stp=dst-jpg_tt6&cstp=mx206x206&ctp=s200x200&_nc_cat=102&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGwGF4ONy-jCbTDh10q-PbFZjbUZhg5BwlmNtRmGDkHCeFKmaqHlWsJOsWt1UWRAw0MEVjHyjJZxDqaxaM_vkBz&_nc_ohc=BHooeYjtUdgQ7kNvwG81mro&_nc_oc=Adr_qdkD0jW6H2KyqIq6tdWIkWl5FaYEM_uXyGvXNrE6p8kxhCx5YKoUJSCOUuto2_M&_nc_zt=24&_nc_ht=scontent.fmnl9-6.fna&_nc_gid=bAZ9CknqDwgErVLUKfldeA&_nc_ss=7b2a8&oh=00_AQAY5As_qp_2WM40ExIwnBK7y4uGlny6ibOcmPxG1so2dw&oe=6A6CEA5E'}/>
                                        <UserCard userName={'Trisha Wyne Bobis'} followerCount={76} followingCount={3} profileURL={'https://scontent.fmnl9-4.fna.fbcdn.net/v/t39.30808-1/615053689_3027601990963411_2061465663798132513_n.jpg?stp=dst-jpg_tt6&cstp=mx1548x1555&ctp=s100x100&_nc_cat=105&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeF1CpW5UvpC81o6T7elslKpOvfWlZviofM699aVm-Kh81k7Yg7XKRwOeZPPkeNKjK9k_Iv4BxixlVjEdz32C6rs&_nc_ohc=QfOVOhN1yAMQ7kNvwGOpcfh&_nc_oc=AdqXLdO6h8b4DIXL-hWh-PW2sQLOU4SGvgN_xAAiLo7a172Obe6j8_NnpgBHZjMt2VU&_nc_zt=24&_nc_ht=scontent.fmnl9-4.fna&_nc_gid=XWkCZd4Akf5NaJqzAAhWAA&_nc_ss=7b2a8&oh=00_AQBOWtlAFueUjLnDs0YSlRGnsdhuKo93GOsV1NbCN9OFoA&oe=6A6D030D'}/>
                                </div>
                        )}
                </section>
        )
}