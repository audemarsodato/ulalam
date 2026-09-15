import './CookingHistory.css'

import Header from "../../components/Header"
import DailyHistory from "./components/DailyHistory"
import { useEffect, useState } from 'react'
import { fetchCookingHistory } from '../../services/coookingLogsService'
import useUserContext from '../../hooks/useUserContext'

export default function CookingHistory() {
        const { user } = useUserContext()

        const [ records, setRecords ] = useState([])
        const [ currentPage, setCurrentPage ] = useState(1)

        const groupedRecords = records.reduce((groups, record) => {
                const date = new Date(record.createdAt).toISOString().split('T')[0]

                if (!groups[date]) {
                        groups[date] = []
                }

                groups[date].push(record)

                return groups
        }, {})

        useEffect(() => {
                const getrecords = async () => {

                        const { records, error } = await fetchCookingHistory({token: user.token, limit: 9, page: currentPage})
                        
                        if (error) {
                                // setError(recordsError)
                                console.log(recordsError)
                                return
                        }
                        setRecords(current => [...current, ...records])
                }
                getrecords()
        }, [currentPage])

        const displayDates = Object.entries(groupedRecords).map(([date, records]) => (
                <DailyHistory key={date} date={date} records={records} />
        ))

        return (
                <section className="history-page">
                        <Header pageTitle={'Cooking History'}/>

                        <section className="history">
                                {displayDates}
                        </section>

                        <footer className="load-more">
                                <button onClick={() => setCurrentPage(current => current + 1)}>Load more</button>
                        </footer>
                </section>
        )
}