import { useEffect, useState } from 'react'

import './Search.css'

import Header from '../../components/Header'
import Ingredient from '../../components/Ingredient'
import UlamCardSearch from '../../components/ulam-cards/UlamCardSearch'
import UserCard from '../../components/user-card/UserCard'
import Error from './components/Error'

import { queryLimit } from '../../config/config'

import useUserContext from '../../hooks/useUserContext'

import { fetchUlamsByIngredients } from '../../services/searchService'
import { fetchQueryUsers } from '../../services/userService'

export default function Search() {
        const { user } = useUserContext()
        const [ matchedUlams, setMatchedUlams ] = useState(null)
        const [ matchedUsers, setMatchedUsers ] = useState(null)
        const [ ulamError, setUlamError ] = useState(null)
        const [ userError, setUserError ] = useState(null)

        const [ mode, setMode ] = useState('ulam')

        const [ input, setInput ] = useState('')
        const [ ingredients, setIngredients ] = useState([])

        useEffect(() => {
                setUlamError(null)
                if (ingredients.length === 0) return
                
                const queryUlams = async () => {
                        setMatchedUlams(null)

                        let ingredientsString = ingredients.join(',')

                        const { ulams, error } = await fetchUlamsByIngredients({ingredientsString, token: user.token})
                        
                        if (error) {
                                setUlamError(error)
                                console.log(error)
                                return
                        }
                        setMatchedUlams(ulams)
                }
                queryUlams()
        }, [ingredients])

        useEffect(() => {
                setInput('')
        }, [mode])

        const addIngredient = (event) => {
                event.preventDefault()

                if (!input) return

                setIngredients(current => [...current, input])
                setInput('')
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

        const displayMatchedUlams = matchedUlams && matchedUlams.map(ulam => 
                <UlamCardSearch ulamName={ulam.name} matchCount={ulam.matchCount} id={ulam._id} imageUrl={ulam.image_url}/>
        )

        const searchPeople = async () => {
                setMatchedUsers(null)
                setUserError(null)
                
                if (!input) return

                const { users: matchedUsers, error } = await fetchQueryUsers({username: input, limit:  queryLimit, token: user.token})
                        
                if (error) {
                        setUserError(error)
                        console.log(error)
                        return
                }

                if (matchedUsers.length === 0) {
                        setUserError({message: 'No user found'})
                        return
                }

                setMatchedUsers(matchedUsers)
                setUserError(null)
        }

        // const displayMatchedUsers = matchedUsers && <UserCard userName={matchedUsers.username} followerCount={matchedUsers.followers.length} followingCount={matchedUsers.followings.length} profileURL={matchedUsers.profile_image_url}/>
        const displayMatchedUsers = matchedUsers && matchedUsers.map(user => 
                <UserCard user={user} />
        )

        return (
                <section className="search-page">
                        <Header pageTitle={'Search'}/>

                        <form className="search-form" >
                                <input
                                        type="text"
                                        placeholder='Search'
                                        value={input}
                                        onChange={(event) => setInput(event.target.value)}
                                />
                                {mode === 'ulam' &&
                                        <button type='button' onClick={addIngredient}>
                                                <span className="material-symbols-rounded">
                                                        {mode === 'ulam' ? 'add_circle_outline' : 'search'}
                                                </span>
                                        </button>
                                }
                                {mode === 'people' &&
                                        <button type='button' onClick={searchPeople}>
                                                <span className="material-symbols-rounded">
                                                        {mode === 'ulam' ? 'add_circle_outline' : 'search'}
                                                </span>
                                        </button>
                                }
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
                                                                {displayMatchedUlams}
                                                                {ulamError &&
                                                                        <Error error={ulamError}/>
                                                                }
                                                        </div>
                                                </div>
                                        </div>
                                )
                        )}

                        {mode === 'people' && (
                                <div className="results people">
                                        {displayMatchedUsers}
                                        {userError &&
                                                <Error error={userError}/>
                                        }
                                </div>
                        )}
                </section>
        )
}