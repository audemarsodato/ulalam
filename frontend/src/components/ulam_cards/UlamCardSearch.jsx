import useUlamCard from "./useUlamCard"

export default function UlamCardSearch({ ulamName, matchCount }){
        const { openProfile } = useUlamCard(ulamName)

        return (
                <div className="ulam-card" onClick={openProfile}>
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