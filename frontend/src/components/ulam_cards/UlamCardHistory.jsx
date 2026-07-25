import tinolaPic from '../../assets/tinola.jpg'

export default function UlamCardHistory({ ulamName, date, mealtime }){

        return (
                <div className="ulam-card history">
                        <div className="image-container">
                                <img src={tinolaPic} loading='lazy' />
                        </div>

                        <div className="details">
                                <h1>{ulamName}</h1>
                                <p>{date} - {mealtime}</p>
                        </div>

                        <div className='arrow-forward'>
                                <span className="material-symbols-rounded">arrow_forward_ios</span>
                        </div>
                </div>
        )
}