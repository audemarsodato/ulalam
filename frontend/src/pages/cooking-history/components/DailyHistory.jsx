import '../CookingHistory.css'

import UlamCardHistory from '../../../components/ulam-cards/UlamCardHistory'
import DeletedUlamCard from '../../../components/ulam-cards/DeletedUlamCard'
import { capitalize } from '../../../utils/formatText'
import { formatHistoryDate } from '../../../utils/formatDate'

export default function DailyHistory({ date, records }) {

        const displayUlamRecords = records.map(record => record.ulam_id ?
                <UlamCardHistory ulam={record.ulam_id} mealtime={capitalize(record.mealtime)} />
                :
                <DeletedUlamCard />
        )

        return (
                <section className='daily-history'>
                        <div className='date-header'>
                                <h2>{formatHistoryDate(date)}</h2>
                        </div>
                        <div className='ulam-container'>
                                {displayUlamRecords}
                        </div>
                </section>
        )
}