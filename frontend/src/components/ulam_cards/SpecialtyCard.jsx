import tinolaPic from '../../assets/tinola.jpg'
import useUlamCard from './useUlamCard'

export default function SpecialtyCard({ ulamName, owner, timesCooked }) {
        const { openProfile } = useUlamCard(ulamName)

        return (
                <div className="specialty-card" onClick={openProfile}>
                        <div className="image-container">
                                <img src={tinolaPic} loading='lazy'/>
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
                                        <a href="#">
                                                <span className="material-symbols-rounded">restaurant</span>
                                        </a>
                                </div>
                        </div>
                </div>
        )
}