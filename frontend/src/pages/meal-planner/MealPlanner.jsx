import { useEffect, useState } from 'react'

import './MealPlanner.css'

import Header from '../../components/Header'
import Day from './components/Day'
import UlamCardPlanner from '../../components/ulam-cards/UlamCardPlanner'
import UlamCard from '../../components/ulam-cards/UlamCard'
import Modal from '../../components/modal/Modal'

import { mealtimes, numDaysAhead } from '../../config/config'
import { capitalize } from '../../utils/formatText'

import useUserContext from '../../hooks/useUserContext'

import { fetchBookmarks } from '../../services/ulamsService'
import { fetchAddMealplan, fetchMealplans, fetchRemoveMealplan } from '../../services/mealplansService'

export default function MealPlanner() {
        const { user } = useUserContext()

        const [ activeModal, setActiveModal ] = useState(null)
        
        const [ selectedDate, setSelectedDate ] = useState(new Date())
        const [ selectedMealtime, setSelectedMealtime ] = useState('breakfast')

        const [ mealplan, setMealplan ] = useState([])
        const [ bookmarks, setBookmarks ] = useState(null)

        const today = new Date()
        const next7Days = []

        for (let i = 0; i < numDaysAhead; i++) {
                const date = new Date(today)
                date.setDate(date.getDate() + i)

                next7Days.push(date)
        }

        useEffect(() => {
                const getBookmarks = async () => {
                        const { bookmarks, error } = await fetchBookmarks(user.token)
                        
                        if (error) {
                                // setError(error)
                                console.log(error)
                                return
                        }
                        setBookmarks(bookmarks)
                }
                const getMealplans = async () => {
                        const { mealplans, error } = await fetchMealplans(user.token)
                        
                        if (error) {
                                // setError(error)
                                console.log(error)
                                return
                        }
                        console.log(mealplans)
                        setMealplan(mealplans)
                }
                getMealplans()
                getBookmarks()
        }, [])

        const addToPlan = async (ulam) => {
                // TODO: create error message system, toast, popup etc
                if (!selectedMealtime) return

                const mealplanInput = {
                        ulamId : ulam._id, 
                        date: selectedDate, 
                        mealtime: selectedMealtime
                }

                const { mealplan, error } = await fetchAddMealplan({ mealplan: mealplanInput, token:user.token })
                        
                if (error) {
                        // setError(error)
                        console.log(error)
                        return
                }

                setMealplan(current => 
                        [
                                ...current, 
                                {...mealplan, mealtime: capitalize(mealplan.mealtime)}
                        ]
                )
                setSelectedMealtime('breakfast')
                setActiveModal(null)
        }

        const removeUlamFromPlan = async (planToRemove) => {
                setMealplan(current => current.filter(plan => plan !== planToRemove))

                const { mealplan, error } = await fetchRemoveMealplan({ mealplanId: planToRemove._id, token: user.token })

                if (error) {
                        // setError(error)
                        console.log(error)
                        setMealplan(current => 
                                [
                                        ...current, 
                                        {...planToRemove, mealtime: capitalize(planToRemove.mealtime)}
                                ]
                        )
                        return
                }
        }

        const displayDates = next7Days.map(day => (
                <Day 
                        key={day} 
                        isActive={selectedDate.toDateString() === day.toDateString()} 
                        onclick={() => setSelectedDate(day)} 
                        weekday={day.toLocaleDateString('en-US', { weekday: 'short'})} 
                        monthday={day.getDate()} 
                />
        ))

        const displayBookmarks = bookmarks && bookmarks.map(ulam => 
                <UlamCard 
                        ulamName={ulam.name} 
                        owner={ulam.user_id.username} 
                        imageURL={ulam.image_url}
                        onClick={() => addToPlan(ulam)}
                />
        )

        const displayUlamPlans = mealplan.filter(plan => new Date(plan.date).toDateString() === selectedDate.toDateString()).map(plan => (
                <UlamCardPlanner 
                        id={plan.ulam_id._id}
                        ulamName={plan.ulam_id.name} 
                        mealtime={capitalize(plan.mealtime)} 
                        imageUrl={plan.ulam_id.image_url}
                        onDelete={() => removeUlamFromPlan(plan)} 
                />
        ))

        return (
                <section className="meal-planner-page">
                        <Header pageTitle={'Ulam Planner'} />
                        
                        <div className="week-calendar">
                                <div className="week-container">
                                        {displayDates}
                                </div>
                        </div>

                        <div className="ulam-plans">
                                <h2 className='current-date'>{today.toDateString() === selectedDate.toDateString() ? 'Today - ' : ''}{selectedDate.toLocaleDateString('en-US', {
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
                                        <span className='label'>Add ulam</span>
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