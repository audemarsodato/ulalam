import { useState } from 'react'

import './MealPlanner.css'

import Header from '../../components/Header'
import Day from './components/Day'
import UlamCardPlanner from '../../components/ulam-cards/UlamCardPlanner'
import UlamCard from '../../components/ulam-cards/UlamCard'
import Modal from '../../components/modal/Modal'

export default function MealPlanner() {
        const [ activeModal, setActiveModal ] = useState(null)
        const [ selectedDate, setSelectedDate ] = useState(new Date())
        const [ selectedMealtime, setSelectedMealtime ] = useState('breakfast')
        const [ mealplan, setMealplan ] = useState([])
        const today = new Date()
        const next7Days = []
        const numDaysAhead = 7
        const mealtimes = ['breakfast', 'lunch', 'dinner']

        for (let i = 0; i < numDaysAhead; i++) {
                const date = new Date(today)
                date.setDate(date.getDate() + i)

                next7Days.push(date)
        }

        const bookmarks = [
                { ulamName: 'Tinola', owner: 'Trisha Wyne Bobis'},
                { ulamName: 'Sinigang na Bangus', owner: 'Apple Mae Odato'},
                { ulamName: 'Adobong Chicken', owner: 'Nanay'}
        ]


        const addToPlan = ({ ulam, owner, date, mealtime }) => {
                // TODO: create error message system, toast, popup etc
                if (!selectedMealtime) return

                // TODO: create capitalize utility function
                setMealplan(current => [...current, {ulam, owner, date, mealtime: mealtime.charAt(0).toUpperCase() + mealtime.slice(1)}])
                setActiveModal(null)
        }

        const displayBookmarks = bookmarks.map(ulam => 
                <UlamCard 
                        ulamName={ulam.ulamName} 
                        owner={ulam.owner} 
                        onClick={() => addToPlan({ulam, owner: 'audemarsodato', date: selectedDate, mealtime: selectedMealtime})} 
                />
        )

        const displayUlamPlans = mealplan.filter(plan => plan.date.toDateString() === selectedDate.toDateString()).map(plan => (
                <UlamCardPlanner ulamName={plan.ulam.ulamName} mealtime={plan.mealtime} onDelete={() => console.log('Ulam card planner delete')} />
        ))

        return (
                <section className="meal-planner-page">
                        <Header pageTitle={'Ulam Planner'} />
                        
                        <div className="week-calendar">
                                <div className="week-container">
                                        {next7Days.map(day => (
                                                <Day key={day} isActive={selectedDate.toDateString() === day.toDateString()} onclick={() => setSelectedDate(day)} weekday={day.toLocaleDateString('en-US', { weekday: 'short'})} monthday={day.getDate()} />
                                        ))}
                                </div>
                        </div>

                        <div className="ulam-plans">
                                <h2 className='current-date'>{selectedDate.toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        month: 'long',
                                        day: 'numeric'
                                })}</h2>

                                <div className="ulam-container">
                                        { displayUlamPlans }
                                </div>

                        </div>
                        
                        <div className="action">
                                <button onClick={() => setActiveModal('add-ulam')}>
                                        <span class='material-symbols-rounded'>add</span>
                                        <span className='label'>Add meal</span>
                                </button>
                        </div>

                        {activeModal === 'add-ulam' &&
                                <Modal modalTitle={'Add Ulam'} onClose={() => setActiveModal(null)}>
                                        <section className="mealtime">
                                                {mealtimes.map(mealtime => (
                                                        <label className={`mealtime__option ${selectedMealtime === mealtime ? 'mealtime__option--active' : ''}`}>
                                                                <input
                                                                        type="radio" 
                                                                        name="mealtime" 
                                                                        value={mealtime} 
                                                                        checked={selectedMealtime === mealtime}
                                                                        onChange={() => setSelectedMealtime(mealtime)}
                                                                        hidden
                                                                />
                                                                <span>{mealtime.charAt(0).toUpperCase() + mealtime.slice(1)}</span>
                                                        </label>
                                                ))}
                                        </section>

                                        <section className="bookmarks">
                                                <h2 className="bookmarks__title">Your Bookmarks</h2>
                                                <div className="ulam-container">
                                                        { displayBookmarks }
                                                </div>
                                        </section>
                                </Modal>
                        }
                </section>
        )
}