import useUlamCard from "./useUlamCard"

export default function UlamCardPlanner({ ulamName, mealtime, date, onDelete }) {
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

                        <div className='delete' onClick={event => event.stopPropagation()}>
                                <button className="delete__button" onClick={onDelete}>
                                        <span className="material-symbols-rounded">delete</span>
                                </button>
                        </div>
                </div>
        )
}