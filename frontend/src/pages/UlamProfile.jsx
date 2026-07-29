import { Link } from "react-router-dom"

import Sinigang from '../assets/sinigang-bangus.jpg'
import Stat from '../components/ulam-profile/Stat'
import Comment from "../components/ulam-profile/Comment"
import Ingredient from '../components/Ingredient'
import UlamCard from '../components/ulam-cards/UlamCard'

export default function UlamProfile() {
        const user = 'Audemars Odato'

        const ulam = {
                title: 'Sinigang na Bangus',
                owner: 'Audemars Odato',
                likedBy: ['Audemars Odato', 'Trisha Wyne', 'w', 'v'],
                ingredients: ['Sibuyas', 'Kamatis', 'Luya', 'Bangus'],
                instructions: ['Pakulo ng water and lagay sibuyas at kamatis', 'Lagay sinigang mix', 'Lagay na bangus'],
                variationOf: null
        }

        return (
                <section className="ulam-profile-page">
                        <header className="page-headers">
                                <div className="return-button">
                                        <Link to={'/'}><span className="material-symbols-rounded">arrow_back_ios</span></Link>
                                </div>

                                <div className="actions">
                                        <button className="bookmark-button"><span className="material-symbols-rounded">bookmark_add</span></button>
                                        {user === ulam.owner &&
                                                <button className="more-button"><span className="material-symbols-rounded">more_vert</span></button>
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
                                        <span className="material-symbols-rounded">favorite</span>
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
                                <Link to={'/ulams/:ulamId/variations/new'}>Create Variation</Link>
                        </section>

                        <section className="comments section">
                                <h2>Comments</h2>
                                <form>
                                        <input type="text" placeholder="Leave a comment" />
                                        <button type="submit"><span className="material-symbols-rounded">send</span></button>
                                </form>
                                <div className="comments-container">
                                        <Comment user={'Audemars Odato'} timestamp={'12 minutes ago'} message={'Very Delicious!'}/>
                                        <Comment user={'Trisha Wyne Bobis'} timestamp={'1 hour ago'} message={'Dapat may sinigang mix.'}/>
                                </div>
                        </section>

                        <div className="cook-button">
                                <button type="submit">COOK</button>
                        </div>
                </section>
        )
}