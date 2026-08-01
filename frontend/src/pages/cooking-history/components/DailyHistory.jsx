import '../CookingHistory.css'

import UlamCardHistory from "../../../components/ulam-cards/UlamCardHistory"

export default function DailyHistory({ date, ulams  }) {

        return (
                <section className="daily-history">
                        <div className="date-header">
                                <h2>{date}</h2>
                        </div>
                        <div className="ulam-container">
                                <UlamCardHistory ulamName={'Adobong Chicken'}  mealtime={'Dinner'} />
                                <UlamCardHistory ulamName={'Sinigang na Bangus'}  mealtime={'Lunch'} />
                        </div>
                </section>
        )
}