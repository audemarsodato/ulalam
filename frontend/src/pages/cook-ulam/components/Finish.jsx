import '../CookUlam.css'

import UlamCardHistory from '../../../components/ulam-cards/UlamCardHistory'

export default function Finish({ ulamName }) {

        return (
                <section className="finish-page">
                        <div className="header">
                                <h1>
                                        <span className="material-symbols-rounded finish-icon">restaurant</span>
                                        { ulamName }
                                </h1>
                                <p className='mastery-message'>
                                        <span className="material-symbols-rounded mastery-icon">workspace_premium</span>
                                        Mastery 
                                        +1
                                </p>
                        </div>

                        <div className="history">
                                <h2>History</h2>
                                <div className="ulam-container">
                                        <UlamCardHistory ulamName={'Sinigang na Bangus'} date={'Today'} mealtime={'Lunch'} />
                                </div>
                        </div>
                </section>
        )
}