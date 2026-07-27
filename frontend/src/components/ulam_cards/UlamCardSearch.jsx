
export default function UlamCardSearch({ ulamName, matchCount }){

        return (
                <div className="ulam-card">
                        <div className="image-container">
                                <img src="" loading="lazy"/>
                        </div>

                        <div className="details">
                                <h1>{ulamName}</h1>
                                <p>{matchCount} ingredients matched</p>
                        </div>

                        <div className='arrow-forward'>
                                <span className="material-symbols-rounded">arrow_forward_ios</span>                                
                        </div>
                </div>
        )
}