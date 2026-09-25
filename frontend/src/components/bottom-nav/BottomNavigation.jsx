import { Link } from 'react-router-dom'

import './BottomNav.css'
import useUserContext from '../../hooks/useUserContext'

export default function BottomNavigation() {
        const { user } = useUserContext()
       
        return (
                <section className="bottom-nav">
                        <div className="bottom-nav-container">
                                <Link to={'/meal-planner'} className="meal-planner-button action">
                                        <span className='material-symbols-rounded'>calendar_month</span>
                                        <p>Meal Plan</p>
                                </Link>

                                <Link to={'/search'} className="search-button action">
                                        <span className='material-symbols-rounded'>search</span>
                                        <p>Search</p>
                                </Link>

                                <div className="create-ulam-button action">
                                        <Link to={'/ulams/create'}>
                                                <span className='material-symbols-rounded'>add</span>
                                        </Link>
                                </div>

                                <Link to={'/cook/history'} className="cooking-history-button action">
                                        <span className='material-symbols-rounded'>history</span>
                                        <p>History</p>
                                </Link>

                                <Link to={`/users/${user.username}`} className="profile-button action">
                                        <span className='material-symbols-rounded'>person</span>
                                        <p>Profile</p>
                                </Link>
                        </div>
                </section>
        )
}