
import './Ulams.css'

export default function DeletedUlamCard() {
       
        return (
                <div className="deleted-ulam-card ulam-card">
                        <div className="deleted-ulam-card__message">
                                <span class='material-symbols-rounded'>info</span>
                                <p>This ulam has been deleted.</p>
                        </div>
                        {/* <div className="image-container">
                                <img loading="lazy"/>
                        </div> */}
{/* 
                        <div className="details">
                                <h1>{ulamName}</h1>
                                { owner &&
                                        <p>By {owner}</p>
                                }
                                { stats &&
                                        <p>
                                                <span class='material-symbols-rounded'>bookmark</span>
                                                {stats.bookmarks}
                                        </p>
                                }
                        </div>

                        <div className='arrow-forward'>
                                <span className="material-symbols-rounded">arrow_forward_ios</span>                                
                        </div> */}
                </div>
        )
}