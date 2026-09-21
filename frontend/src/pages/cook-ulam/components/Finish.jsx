import '../CookUlam.css'

import UlamCardHistory from '../../../components/ulam-cards/UlamCardHistory'
import { useEffect, useState } from 'react'

export default function Finish({ ulam }) {
        const [ mealtime, setMealtime ] = useState('')

        function getMealtime(timeCooked) {
                const hour = timeCooked.getHours()
                const minutes = timeCooked.getMinutes()
                const timeCookedInMinutes = hour * 60 + minutes
                let mealtime = ''
        
                if (timeCookedInMinutes >= 360 && timeCookedInMinutes < 600) mealtime = 'breakfast'
                if (timeCookedInMinutes >= 601 && timeCookedInMinutes < 840) mealtime = 'lunch'
                if (timeCookedInMinutes >= 840 && timeCookedInMinutes < 1020) mealtime = 'meryenda'
                if (timeCookedInMinutes >= 1020 && timeCookedInMinutes < 1260) mealtime = 'dinner'
                if (timeCookedInMinutes >= 1260 || timeCookedInMinutes < 60) mealtime = 'meryenda'
        
                return mealtime
        }

        useEffect(() => {
                const today = new Date()
                setMealtime(getMealtime(today))
        }, [])

        return (
                <section className="finish-page">
                        <div className="header">
                                <h1>
                                        <span className="material-symbols-rounded finish-icon">restaurant</span>
                                        { ulam.name }
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
                                        <UlamCardHistory ulam={ulam} date={'Today'} mealtime={mealtime} />
                                </div>
                        </div>
                </section>
        )
}