import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import UlamCardHistory from '../components/ulam-cards/UlamCardHistory'
import UlamCard from '../components/ulam-cards/UlamCard'
import SpecialtyCard from '../components/ulam-cards/SpecialtyCard'
import BottomNavigation from '../components/bottom-nav/BottomNavigation'
import useUserContext from '../hooks/useUserContext'
import defaultProfileImage from '../assets/icons/default-profile-picture.svg'
import { fetchCookingRecords, fetchUlamsFromFollowings } from '../services/userService'
import { formatCreatedAt } from '../utils/formatDate'
import { capitalize } from '../utils/formatText'
import EmptyUlams from '../components/empty-ulams/EmptyUlams'
import DeletedUlamCard from '../components/ulam-cards/DeletedUlamCard'

export default function Home() {
        const { user } = useUserContext()
        const [ timeOfDay, setTimeOfDay ] = useState('')

        useEffect(() => {
                const hour = new Date().getHours()
                if (hour < 12) setTimeOfDay('morning')
                else if (hour < 17) setTimeOfDay('afternoon')
                else setTimeOfDay('evening')
        }, [])

        const [ cookedUlams, setCookedUlams ] = useState([])
        const [ ulamsFromFollowings, setUlamsFromFollowings ] = useState([])

        useEffect(() => {
                const getUlams = async () => {
                        const { cooking_records, error: recordsError } = await fetchCookingRecords({token: user.token, limit: 3})
                        if (recordsError) {
                                // setError(recordsError)
                                console.log(recordsError)
                                return
                        }
                        console.log(cooking_records)
                        setCookedUlams(cooking_records)
                        
                        const { ulams_from_followings, error: fromFollowingsError } = await fetchUlamsFromFollowings(user.token)
                        if (fromFollowingsError) {
                                // setError(recordsError)
                                console.log(fromFollowingsError)
                                return
                        }
                        setUlamsFromFollowings(ulams_from_followings)
                }
                getUlams()
        }, [])

        const displayHistory = cookedUlams.slice(0, 3).map(record => record.ulam_id ?
                <UlamCardHistory 
                        ulamName={record.ulam_id.name} 
                        date={formatCreatedAt(record.createdAt)} 
                        mealtime={capitalize(record.mealtime)} 
                        imageURL={record.ulam_id.image_url}
                        id={record.ulam_id._id}
                />
                :
                <DeletedUlamCard />
        )

        const displaySpecialties = user.earned_specialties.sort((a, b) => b.times_cooked - a.times_cooked).map(ulam => 
                <SpecialtyCard 
                        ulamName={ulam.name} 
                        owner={ulam.username} 
                        timesCooked={ulam.times_cooked} 
                        imageURL={ulam.image_url} 
                        id={ulam._id}
                />
        )

        const displayUlamsFromFollowings = ulamsFromFollowings?.map(ulam=> 
                <UlamCard ulamName={ulam.ulamName} owner={ulam.owner} id={ulam._id} />
        )

        return (
                <section className='home-page'>
                        <header>
                                <Link to={'/users/audemarsodato'} className='profile-image'>
                                        <img src={user.profile_image_url ? user.profile_image_url : defaultProfileImage}/>
                                </Link>
                                <p>Ulalam</p>
                        </header>

                        <div className='greetings'>
                                <h2>Good {timeOfDay}, {user.username}</h2>
                        </div>

                        <div className='search'>
                                <Link to='/search'>
                                        <span className='material-symbols-rounded'>search</span>
                                        Search
                                </Link>
                        </div>
                        
                        <section className='you-cooked-section section'>
                                <header>
                                        <h2 className='section-title'>You Cooked</h2>
                                        <Link to={'/cook/history'}>Full History {'->'}</Link>
                                </header>

                                <div className='ulam-container'>
                                        {cookedUlams.length > 0 ?
                                                displayHistory
                                                :
                                                <EmptyUlams message={'No cooking history yet. Start cooking to see your history here.'} />
                                        }
                                </div>
                        </section>

                        <section className='specialties-section section'>
                                <header>
                                        <h2 className='section-title'>Your Specialties</h2>
                                </header>

                                <div className='ulam-container'>
                                        {user.earned_specialties.length > 0 ?
                                                displaySpecialties
                                                : 
                                                <EmptyUlams message={"No specialties yet. Keep cooking your favorite ulams to earn specialties!"} />
                                        }
                                </div>
                        </section>

                        {ulamsFromFollowings.length > 0 &&
                                <section className='latest-from-following-section section'>
                                        <header>
                                                <h2 className='section-title'>Latest from people you follow</h2>
                                        </header>

                                        <div className='ulam-container'>
                                                {displayUlamsFromFollowings}
                                        </div>
                                </section>
                        }

                        <BottomNavigation />
                </section>
        )
}