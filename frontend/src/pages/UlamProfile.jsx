import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { formatDistanceToNow } from 'date-fns'

import Stat from '../components/ulam-profile/Stat'
import Comment from "../components/ulam-profile/Comment"
import Ingredient from '../components/Ingredient'
import UlamCard from '../components/ulam-cards/UlamCard'
import useUserContext from '../hooks/useUserContext'
import { fetchUlam, fetchLikeUlam, fetchUnlikeUlam, fetchVariations } from "../services/ulamsService"
import EmptyUlams from '../components/empty-ulams/EmptyUlams'

export default function UlamProfile() {
        const { user, dispatch: userDispatch } = useUserContext()
        const { ulamId } = useParams()
        const [ ulam, setUlam ] = useState(null)

        const [ liked, setLiked ] = useState(false)
        const [ isLiking, setIsLiking ] = useState(false)

        const [ showOptions, setShowOptions ] = useState(false)
        const [ showCookButton, setShowCookButton ] = useState(true)
        const [ commentInput, setCommentInput ] = useState('')
        const [ variations, setVariations ] = useState([])

        useEffect(() => {
                const getUlam = async () => {
                        const { ulam, error } = await fetchUlam({ulamId, token: user.token})
                        
                        if (error) {
                                // setError(error)
                                console.log(error)
                                return
                        }

                        setLiked(ulam.liked_by.includes(user._id))
                        setUlam(ulam)

                        // fetch variations ulams
                        if (ulam.variation_of === null) {
                                const { ulams, error } = await fetchVariations({ulamId, token: user.token})
                        
                                if (error) {
                                        // setError(error)
                                        console.log(error)
                                        return
                                }
                                setVariations(ulams)
                        }
                }
                // Does not need await because it does not return any value needed
                getUlam()
        }, [])

        if (!ulam) return

        const handleLike = async () => {
                if (isLiking) return

                setIsLiking(true)

                if (liked) {
                        setLiked(false)
                        // Removes the users id
                        setUlam(prev => ({...prev, liked_by: prev.liked_by.filter(userId => userId !== user._id)}))
                        const { ulam, error } = await fetchUnlikeUlam({ulamId, token: user.token})
        
                        if (error) {
                                // setError(error)
                                console.log(error)
                                setUlam(prev => ({...prev, liked_by: [...prev.liked_by, user._id]}))
                                setLiked(true)
                        }
                        setIsLiking(false)
                        return
                }

                setLiked(true)
                // Adds the users id
                setUlam(prev => ({...prev, liked_by: [...prev.liked_by, user._id]}))
                const { ulam, error } = await fetchLikeUlam({ulamId, token: user.token})

                if (error) {
                        // setError(error)
                        console.log(error)
                        setLiked(false)
                        setUlam(prev => ({...prev, liked_by: prev.liked_by.filter(userId => userId !== user._id)}))
                }
                setIsLiking(false)
                return
        }

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

        const displayVariations = variations.map(ulam => 
                <UlamCard ulamName={ulam.name} owner={ulam.user_id.username} />
        )

        console.log(ulam)
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

                                        {user._id === ulam.user_id._id &&
                                                <div className="more">
                                                        <button className="more-button" onClick={() => setShowOptions(current => !current)}>
                                                                <span className="material-symbols-rounded">more_vert</span>
                                                        </button>

                                                        {showOptions &&
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

                        <section className="ulam-image" onDoubleClick={handleLike}>
                                <img src={ulam.image_url} loading="lazy"/>
                        </section>

                        <section className="title section">
                                <div className="details">
                                        <h1 className="title">{ulam.name}</h1>
                                        <p className="owner">By {ulam.user_id.username}</p>
                                </div>

                                <div className="like-button">
                                        <button onClick={handleLike}>
                                                <span className={`material-symbols-rounded ${liked ? 'filled-icon' : ''}`}>favorite</span>
                                        </button>
                                        <p>{ulam.liked_by.length}</p>
                                        {/* <p>{ulam.liked_by.length} Likes</p> */}
                                </div>
                        </section>

                        <section className="statistics section">
                                <Stat value={ulam.cooked_count} icon={'skillet'} title={'Cooked'}/>
                                <div className="divider"></div>
                                <Stat value={ulam.comments.length} icon={'chat'} title={'Comments'}/>
                                <div className="divider"></div>
                                <Stat value={ulam.bookmarked_by.length} icon={'bookmark'} title={'Saved'}/>
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
                                {!ulam.variation_of ? (<>
                                        <h2>Variations</h2>
                                        <div className="variations-container">
                                                {variations.length > 0 ? (
                                                                displayVariations
                                                        ) :
                                                        <EmptyUlams message={'This ulam has no variations yet. Be the first one to make one!'} />
                                                }
                                        </div>
                                        <Link to={`/ulams/${ulamId}/variations/new`}>Create Variation</Link>
                                </>) : (<>
                                        <h2>Variation of</h2>
                                        <div className="variations-container">
                                                <UlamCard ulamName={ulam.variation_of.name} owner={ulam.variation_of.user_id.username} imageURL={ulam.variation_of.image_url} />
                                        </div>
                                </>)}
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
                                {ulam.comments.length > 0 &&
                                        <div className="comments-container">
                                                { displayComments }
                                        </div>
                                }
                        </section>

                        {showCookButton &&
                                <div className="cook-button">
                                        <Link to={`/cook/${ulamId}`}>COOK</Link>
                                </div>
                        }
                </section>
        )
}