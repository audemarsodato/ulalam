import useUlamCard from "./useUlamCard"

export default function UlamCardHistory({ ulam, mealtime, date }){
        const { openProfile } = useUlamCard(ulam._id)

        return (
                <div className="ulam-card history-card" onClick={openProfile}>
                        <div className="image-container">
                                <img src={ulam.image_url} loading='lazy' />
                        </div>

                        <div className="details">
                                <h1>{ulam.name}</h1>
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