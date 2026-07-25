import { Link } from "react-router-dom"

import UlamCardHistory from "../components/ulam_cards/UlamCardHistory"
import UlamCard from "../components/ulam_cards/UlamCard"
import SpecialtyCard from "../components/ulam_cards/SpecialtyCard"

export default function Home() {
        const cookedUlams = [
                { ulamName: 'Tinola', date: 'Today', mealtime: 'Lunch'},
                { ulamName: 'Sinigang na Bangus', date: 'Yesterday', mealtime: 'Dinner'},
                { ulamName: 'Adobong Chicken', date: 'Yesterday', mealtime: 'Lunch'}
        ]

        const ulamFromFollowers = [
                { ulamName: 'Tinola', owner: 'Trisha Wyne Bobis'},
                { ulamName: 'Sinigang na Bangus', owner: 'Apple Mae Odato'},
                { ulamName: 'Adobong Chicken', owner: 'Nanay'}
        ]
        
        const specialties = [
                { ulamName: 'Tinola', owner: 'Trisha Wyne Bobis', timesCooked: 12},
                { ulamName: 'Adobong Chicken', owner: 'Nanay', timesCooked: 8},
                { ulamName: 'Sinigang na Bangus', owner: 'Apple Mae Odato', timesCooked: 9}
        ]

        return (
                <section className="home-page">
                        <header>
                                <div>
                                        <span class="material-symbols-rounded profile-icon">account_circle</span>
                                </div>
                                <p>Ulalam</p>
                        </header>

                        <div className="greetings">
                                <h2>Good morning, Audemars</h2>
                        </div>

                        <div className="search">
                                <a href="#">
                                        <span className="material-symbols-rounded">search</span>
                                        Search
                                </a>
                        </div>
                        
                        <section className="you-cooked-section section">
                                <header>
                                        <h2 className="section-title">You Cooked</h2>
                                        <a href="#">Full History {'->'}</a>
                                </header>

                                <div className="ulam-container">
                                        {cookedUlams.map(ulam=> <UlamCardHistory ulamName={ulam.ulamName} date={ulam.date} mealtime={ulam.mealtime} />)}
                                </div>
                        </section>

                        <section className="specialties-section section">
                                <header>
                                        <h2 className="section-title">Your Specialties</h2>
                                </header>

                                <div className="ulam-container">
                                        {specialties.sort((a, b) => b.timesCooked - a.timesCooked).map(ulam => <SpecialtyCard ulamName={ulam.ulamName} owner={ulam.owner} timesCooked={ulam.timesCooked} />)}
                                </div>
                        </section>

                        <section className="latest-from-following-section section">
                                <header>
                                        <h2 className="section-title">Latest from people you follow</h2>
                                </header>

                                <div className="ulam-container">
                                        {ulamFromFollowers.map(ulam=> <UlamCard ulamName={ulam.ulamName} owner={ulam.owner} />)}
                                </div>
                        </section>

                        <div className="add-ulam-button">
                                <Link to={'/ulams/new'}>
                                        <span className="material-symbols-rounded">add_circle_outline</span>
                                </Link>
                        </div>
                </section>
        )
}