import { useState } from 'react'

import './MealPlanner.css'

import Header from '../../components/Header'
import Day from './components/Day'
import UlamCardPlanner from '../../components/ulam-cards/UlamCardPlanner'

export default function MealPlanner() {
        const [ selectedDate, setSelectedDate ] = useState(new Date())

        const today = new Date()
        const next7Days = []

        const numDaysAhead = 7
        for (let i = 0; i < numDaysAhead; i++) {
                const date = new Date(today)
                date.setDate(date.getDate() + i)

                next7Days.push(date)
        }

        return (
                <section className="meal-planner-page">
                        <Header pageTitle={'Ulam Planner'} />
                        
                        <div className="week-calendar">
                                <div className="week-container">
                                        {next7Days.map(day => (
                                                <Day key={day} isActive={selectedDate.toDateString() === day.toDateString()} onclick={() => setSelectedDate(day)} weekday={day.toLocaleDateString('en-US', { weekday: 'short'})} monthday={day.getDate()} />
                                        ))}
                                        {/* <Day isActive={selectedDate === 'thu, 4'} onclick={() => setSelectedDate('thu, 4')} weekday={'Thu'} monthday={'4'} />
                                        <Day isActive={selectedDate === 'fri, 5'} onclick={() => setSelectedDate('fri, 5')} weekday={'Fri'} monthday={'5'} />
                                        <Day isActive={selectedDate === 'sat, 7'} onclick={() => setSelectedDate('sat, 7')} weekday={'Sat'} monthday={'7'} />
                                        <Day isActive={selectedDate === 'sun, 8'} onclick={() => setSelectedDate('sun, 8')} weekday={'Sun'} monthday={'8'} />
                                        <Day isActive={selectedDate === 'mon, 9'} onclick={() => setSelectedDate('mon, 9')} weekday={'Mon'} monthday={'9'} />
                                        <Day isActive={selectedDate === 'tue, 10'} onclick={() => setSelectedDate('tue, 10')} weekday={'Tue'} monthday={'10'} /> */}
                                </div>
                        </div>

                        <div className="ulam-plans">
                                <h2 className='current-date'>{selectedDate.toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        month: 'long',
                                        day: 'numeric'
                                })}</h2>

                                <div className="ulam-container">
                                        {/* {ulams.filter(ulam => ulam.date === selectedDate).map(ulam => <UlamCard ulam={ulam />})} */}
                                        <UlamCardPlanner ulamName={'Sinigang na Bangus'} mealtime={'Dinner'} />
                                        <UlamCardPlanner ulamName={'Adobong Chicken'} mealtime={'Lunch'} />
                                </div>

                        </div>
                        
                        <div className="action">
                                <button onClick={() => console.log('add')}>
                                        <span class='material-symbols-rounded'>add</span>
                                        <span className='label'>Add meal</span>
                                </button>
                        </div>
                </section>
        )
}