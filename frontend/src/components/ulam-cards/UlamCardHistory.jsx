import useUlamCard from "./useUlamCard"

export default function UlamCardHistory({ ulamName, date, mealtime, imageURL }){
        const { openProfile } = useUlamCard(ulamName)

        return (
                <div className="ulam-card history-card" onClick={openProfile}>
                        <div className="image-container">
                                <img src={imageURL} loading='lazy' />
                        </div>

                        <div className="details">
                                <h1>{ulamName}</h1>
                                <p>
                                        {date &&
                                                `${date} - `
                                        }
                                        {mealtime}
                                </p>
                        </div>

                        <div className='arrow-forward'>
                                <span className="material-symbols-rounded">arrow_forward_ios</span>
                        </div>
                </div>
        )
}