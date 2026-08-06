import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { formatDistanceToNow } from 'date-fns'

import Sinigang from '../assets/sinigang-bangus.jpg'
import Stat from '../components/ulam-profile/Stat'
import Comment from "../components/ulam-profile/Comment"
import Ingredient from '../components/Ingredient'
import UlamCard from '../components/ulam-cards/UlamCard'

export default function UlamProfile() {
        const user = 'Audemars Odato'
        const { ulamId } = useParams()
        const [ liked, setLiked ] = useState(false)
        // if owner
        const [ showOptions, setShowOptions ] = useState(false)
        const [ showCookButton, setShowCookButton ] = useState(true)
        const [ commentInput, setCommentInput ] = useState('')
        
        const [ ulam, setUlam ] = useState({
                title: 'Sinigang na Bangus',
                owner: 'Audemars Odato',
                likedBy: ['Audemars Odato', 'Trisha Wyne', 'w', 'v'],
                ingredients: ['Sibuyas', 'Kamatis', 'Luya', 'Bangus'],
                instructions: ['Pakulo ng water and lagay sibuyas at kamatis', 'Lagay sinigang mix', 'Lagay na bangus'],
                variationOf: null,
                comments: [
                        {
                                user: 'Audemars Odato',
                                content: 'Very delicious!',
                                createdAt: '2026-08-05T11:45:42.123Z'
                        },
                        {
                                user: 'Trisha Wyne Bobis',
                                content: 'Dapat may sinigang mix',
                                createdAt: '2025-12-25T08:30:15.456Z'
                        },
                ]
        })

        const addComment = () => {
                if (!commentInput) return

                setUlam(current => ({
                                ...current, 
                                comments: [
                                        ...current.comments, 
                                        {
                                                user, 
                                                content: commentInput, 
                                                createdAt: new Date()
                                        }
                                ]
                        }
                ))
                setCommentInput('')
        }

        const displayComments = ulam.comments.map(comment => (
                <Comment
                        key={comment.createAt}
                        user={comment.user} 
                        timestamp={formatDistanceToNow(new Date(comment.createdAt), { includeSeconds: true, addSuffix: true}).replace('about', '')} 
                        message={comment.content}
                />
        ))

        console.log('ulamId:', ulamId)

        return (
                <section className="ulam-profile-page">
                        <header className="page-headers">
                                <div className="return-button">
                                        <Link to={'/'}><span className="material-symbols-rounded">arrow_back_ios</span></Link>
                                </div>

                                <div className="actions">
                                        <button className="bookmark button">
                                                <span className="material-symbols-rounded">bookmark_add</span>
                                        </button>

                                        {user === ulam.owner &&
                                                <div className="more">
                                                        <button className="more-button" onClick={() => setShowOptions(current => !current)}>
                                                                <span className="material-symbols-rounded">more_vert</span>
                                                        </button>

                                                        { showOptions &&
                                                                <div className="menu-options">
                                                                        <Link to={`/ulams/${ulamId}/edit`} className="edit button">Edit</Link>
                                                                        {/* TODO: Add confirmation modal */}
                                                                        <button className="delete button">Delete</button> 
                                                                </div>
                                                        }
                                                </div>
                                        }
                                </div>
                        </header>

                        <section className="ulam-image">
                                <img src={Sinigang} loading="lazy"/>
                        </section>

                        <section className="title section">
                                <div className="details">
                                        <h1 className="title">{ulam.title}</h1>
                                        <p className="owner">By {ulam.owner}</p>
                                </div>

                                <div className="like-button">
                                        <button onClick={() => setLiked(current => !current)}>
                                                <span className={`material-symbols-rounded ${liked ? 'filled-icon' : ''}`}>favorite</span>
                                        </button>
                                        <p>{ulam.likedBy.length} Likes</p>
                                </div>
                        </section>

                        <section className="statistics section">
                                <Stat value={12} icon={'skillet'} title={'Cooked'}/>
                                <div className="divider"></div>
                                <Stat value={9} icon={'chat'} title={'Comments'}/>
                                <div className="divider"></div>
                                <Stat value={345} icon={'bookmark'} title={'Saved'}/>
                        </section>

                        <section className="ingredients section">
                                <h2>Ingredients</h2>
                                <div className="ingredients-container">
                                        {ulam.ingredients.map(ingredient => <Ingredient name={ingredient} key={ingredient}/>)}
                                </div>
                        </section>

                        <section className="instructons section">
                                <h2>Instructions</h2>
                                <div className="steps-container">
                                        <ol>
                                                {ulam.instructions.map(step => <li>{step}</li>)}
                                        </ol>
                                </div>
                        </section>

                        <section className="variations section">
                                <h2>Variations</h2>
                                <div className="variations-container">
                                        <UlamCard ulamName={'Sinigang na Bangus with Gabi'} owner={'Audemars Odato'} />
                                </div>
                                <Link to={`/ulams/${ulamId}/variations/new`}>Create Variation</Link>
                        </section>

                        <section className="comments section">
                                <h2>Comments</h2>
                                <form>
                                        <input 
                                                type="text" 
                                                placeholder="Leave a comment" 
                                                value={commentInput} 
                                                onChange={(event) => setCommentInput(event.target.value)}
                                                onFocus={() => setShowCookButton(false)}
                                                onBlur={() => setShowCookButton(true)}
                                        />
                                        <button 
                                                type="button" 
                                                onClick={addComment}
                                        >
                                                <span className="material-symbols-rounded">send</span>
                                        </button>
                                </form>
                                <div className="comments-container">
                                        { displayComments }
                                </div>
                        </section>

                        {showCookButton &&
                                <div className="cook-button">
                                        <Link to={`/cook/${ulamId}`}>COOK</Link>
                                </div>
                        }
                </section>
        )
}