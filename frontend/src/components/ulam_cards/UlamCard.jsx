

export default function UlamCard({ ulamName, owner }){

        return (
                <div className="ulam-card">
                        <div className="image-container">
                                <img src="" loading="lazy"/>
                        </div>

                        <div className="details">
                                <h1>{ulamName}</h1>
                                <p>By {owner}</p>
                        </div>

                        <div className='arrow-forward'>
                                <span className="material-symbols-rounded">arrow_forward_ios</span>                                
                        </div>
                </div>
        )
}