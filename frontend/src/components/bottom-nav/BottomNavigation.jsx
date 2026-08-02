import { Link } from 'react-router-dom'

import './BottomNav.css'

export default function BottomNavigation() {
       
        return (
                <section className="bottom-nav">
                        <div className="bottom-nav-container">
                                <Link to={'/meal-planner'} className="meal-planner-button action">
                                        <span class='material-symbols-rounded'>calendar_month</span>
                                        <p>Meal Plan</p>
                                </Link>

                                <Link to={'/search'} className="search-button action">
                                        <span class='material-symbols-rounded'>search</span>
                                        <p>Search</p>
                                </Link>

                                <div className="create-ulam-button action">
                                        <Link to={'/ulams/create'}>
                                                <span class='material-symbols-rounded'>add</span>
                                        </Link>
                                </div>

                                <Link to={'/cook/history'} className="cooking-history-button action">
                                        <span class='material-symbols-rounded'>history</span>
                                        <p>History</p>
                                </Link>

                                <Link to={'/profile'} className="profile-button action">
                                        <span class='material-symbols-rounded'>person</span>
                                        <p>Profile</p>
                                </Link>
                        </div>
                </section>
        )
}