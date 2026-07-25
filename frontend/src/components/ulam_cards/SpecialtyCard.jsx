import tinolaPic from '../../assets/tinola.jpg'

export default function SpecialtyCard({ ulamName, owner, timesCooked }) {

        return (
                <div className="specialty-card">
                        <div className="image-container">
                                <img src={tinolaPic} loading='lazy'/>
                        </div>

                        <div className="details">
                                <h1>{ulamName}</h1>
                                <p>By {owner}</p>
                        </div>

                        <div className="action">
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