import useUlamCard from "./useUlamCard"

export default function UlamCardPlanner({ ulamName, mealtime, date }) {
        const { openProfile } = useUlamCard(ulamName)
       
        return (
                <div className="ulam-card planner-card" onClick={openProfile}>
                        <div className="image-container">
                                <img loading='lazy' />
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

                        <div className='delete-button' onClick={event => event.stopPropagation()}>
                                <span className="material-symbols-rounded">delete</span>
                        </div>
                </div>
        )
}