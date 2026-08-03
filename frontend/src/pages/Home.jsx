import { Link } from "react-router-dom"

import UlamCardHistory from "../components/ulam-cards/UlamCardHistory"
import UlamCard from "../components/ulam-cards/UlamCard"
import SpecialtyCard from "../components/ulam-cards/SpecialtyCard"
import BottomNavigation from "../components/bottom-nav/BottomNavigation"

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
                                <Link to={'/users/audemarsodato'} className="profile-image">
                                        {/* <span class="material-symbols-rounded profile-icon">account_circle</span> */}
                                        <img src="https://scontent.fmnl9-6.fna.fbcdn.net/v/t39.30808-1/636768676_2340190826450286_1542923457919314152_n.jpg?stp=dst-jpg_tt6&cstp=mx206x206&ctp=s200x200&_nc_cat=102&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGwGF4ONy-jCbTDh10q-PbFZjbUZhg5BwlmNtRmGDkHCeFKmaqHlWsJOsWt1UWRAw0MEVjHyjJZxDqaxaM_vkBz&_nc_ohc=BHooeYjtUdgQ7kNvwG81mro&_nc_oc=Adr_qdkD0jW6H2KyqIq6tdWIkWl5FaYEM_uXyGvXNrE6p8kxhCx5YKoUJSCOUuto2_M&_nc_zt=24&_nc_ht=scontent.fmnl9-6.fna&_nc_gid=bAZ9CknqDwgErVLUKfldeA&_nc_ss=7b2a8&oh=00_AQAY5As_qp_2WM40ExIwnBK7y4uGlny6ibOcmPxG1so2dw&oe=6A6CEA5E"/>
                                </Link>
                                <p>Ulalam</p>
                        </header>

                        <div className="greetings">
                                <h2>Good morning, Audemars</h2>
                        </div>

                        <div className="search">
                                <Link to="/search">
                                        <span className="material-symbols-rounded">search</span>
                                        Search
                                </Link>
                        </div>
                        
                        <section className="you-cooked-section section">
                                <header>
                                        <h2 className="section-title">You Cooked</h2>
                                        <Link to={'/cook/history'}>Full History {'->'}</Link>
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

                        <BottomNavigation />
                </section>
        )
}