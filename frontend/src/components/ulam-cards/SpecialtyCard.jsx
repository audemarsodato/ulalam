import { Link } from 'react-router-dom'

import useUlamCard from './useUlamCard'

export default function SpecialtyCard({ ulamName, owner, timesCooked, imageURL }) {
        const { openProfile } = useUlamCard(ulamName)

        return (
                <div className="specialty-card" onClick={openProfile}>
                        <div className="image-container">
                                <img src={imageURL} loading='lazy'/>
                        </div>

                        <div className="details">
                                <h1>{ulamName}</h1>
                                <p>By {owner}</p>
                        </div>

                        <div className="action" onClick={event => event.stopPropagation()}>
                                <div className="times-cooked">
                                        <span className="material-symbols-rounded">workspace_premium</span> 
                                        <p>{timesCooked}</p>
                                </div>

                                <div className="cook-button">
                                        <Link to={'cook/838iueirer'}>
                                                <span className="material-symbols-rounded">restaurant</span>
                                        </Link>
                                </div>
                        </div>
                </div>
        )
}