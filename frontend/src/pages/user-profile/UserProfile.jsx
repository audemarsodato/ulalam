import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './UserProfile.css'

import Header from "../../components/Header"
import UlamCard from '../../components/ulam-cards/UlamCard'
import SpecialtyCard from '../../components/ulam-cards/SpecialtyCard'
import Modal from "../../components/modal/Modal"
import UserCard from '../../components/UserCard'

export default function UserProfile() {
        const navigate = useNavigate()
        const currentUser = 'not audemarsodato'
        const usersProfile = 'audemarsodato'
        const isOwnProfile = currentUser === usersProfile
        const [ isFollowing, setIsFollowing ] = useState(false)

        const [ activeModal, setActiveModal ] = useState(null)

        const bookmarks = [
                { ulamName: 'Tinola', owner: 'Trisha Wyne Bobis'},
                { ulamName: 'Sinigang na Bangus', owner: 'Apple Mae Odato'},
                { ulamName: 'Adobong Chicken', owner: 'Nanay'}
        ]

        console.log(activeModal)

        return (
                <section className="user-profile-page">
                        <Header pageTitle={'Profile'} />

                        <section className="profile section">
                                <div className="profile-image">
                                        <div className="profile-image-container">
                                                <img src="https://scontent.fmnl9-6.fna.fbcdn.net/v/t39.30808-1/636768676_2340190826450286_1542923457919314152_n.jpg?stp=dst-jpg_tt6&cstp=mx206x206&ctp=s200x200&_nc_cat=102&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGwGF4ONy-jCbTDh10q-PbFZjbUZhg5BwlmNtRmGDkHCeFKmaqHlWsJOsWt1UWRAw0MEVjHyjJZxDqaxaM_vkBz&_nc_ohc=BHooeYjtUdgQ7kNvwG81mro&_nc_oc=Adr_qdkD0jW6H2KyqIq6tdWIkWl5FaYEM_uXyGvXNrE6p8kxhCx5YKoUJSCOUuto2_M&_nc_zt=24&_nc_ht=scontent.fmnl9-6.fna&_nc_gid=bAZ9CknqDwgErVLUKfldeA&_nc_ss=7b2a8&oh=00_AQAY5As_qp_2WM40ExIwnBK7y4uGlny6ibOcmPxG1so2dw&oe=6A6CEA5E" />
                                        </div>
                                        {isOwnProfile &&
                                                <div className="change-profile">
                                                        <button>
                                                                <span class="material-symbols-rounded">edit</span>
                                                        </button>
                                                </div>
                                        }
                                </div>

                                <div className="username">
                                        <h1>Audemars Odato</h1>
                                </div>
                        </section>

                        <section className="stats section">
                                <div className="published stat">
                                        <p className="value">12</p>
                                        <p>Published</p>
                                </div>
                                <div className="followers stat" onClick={() => setActiveModal('followers')}>
                                        <p className="value">3</p>
                                        <p>Followers</p>
                                </div>
                                <div className="following stat" onClick={() => setActiveModal('followings')}>
                                        <p className="value">3</p>
                                        <p>Following</p>
                                </div>
                        </section>

                        <section className="action section">
                                {isOwnProfile ? (
                                        <button className="edit-profile-button">
                                                <span className="material-symbols-rounded">edit</span>
                                                Edit Profile
                                        </button>
                                ) : ( isFollowing ? (
                                                <button className="unfollow-button" onClick={() => setIsFollowing(false)}>
                                                        Following
                                                </button>
                                        ) : (
                                                <button className="follow-button" onClick={() => setIsFollowing(true)}>
                                                Follow
                                                </button>
                                        )
                                )}
                        </section>

                        <section className="specialties section">
                                <h2>Specialties</h2>

                                <div className="ulam-container">
                                        <SpecialtyCard ulamName={'Sinigang na Bangus'} timesCooked={'12'} owner={'Audemars Odato'} />
                                        <SpecialtyCard ulamName={'Sinigang na Bangus'} timesCooked={'12'} owner={'Audemars Odato'} />
                                        <SpecialtyCard ulamName={'Sinigang na Bangus'} timesCooked={'12'} owner={'Audemars Odato'} />
                                </div>
                        </section>

                        <section className="published-ulams section">
                                <h2>Published Ulams</h2>

                                <div className="ulam-container">
                                        <UlamCard ulamName={'Sinigang na Bangus'} stats={{bookmarks: 12, timesCooked: 123}}/>
                                        <UlamCard ulamName={'Adobong Chicken'} stats={{bookmarks: 34, timesCooked: 123}}/>
                                        <UlamCard ulamName={'Sweet and Sour'} stats={{bookmarks: 243, timesCooked: 123}}/>
                                </div>
                        </section>

                        {isOwnProfile &&
                                <section className="more-actions section">
                                        <button onClick={() => setActiveModal('bookmarks')} className='more-actions__bookmark'>Bookmarks</button> {/* opens modal */}
                                        <button onClick={() => navigate('/cook/history')}>Cooking History</button>
                                        {/* <button className='danger-button'>Delete account</button> */}
                                        <button className='logout-button danger-button'>Log out</button>
                                </section>
                        }

                        {activeModal === 'bookmarks' &&
                                <Modal modalTitle={'Bookmarks'} onClose={() => setActiveModal(null)}>
                                        <div className="ulam-container">
                                                {bookmarks.map(ulam => <UlamCard ulamName={ulam.ulamName} owner={ulam.owner}/>)}
                                        </div>
                                </Modal>
                        }

                        {activeModal === 'followers' &&
                                <Modal modalTitle={'Followers'} onClose={() => setActiveModal(null)} >
                                        <div className="user-container">
                                                <UserCard userName={'Audemars Odato'} followerCount={67} followingCount={12} profileURL={'https://scontent.fmnl9-6.fna.fbcdn.net/v/t39.30808-1/636768676_2340190826450286_1542923457919314152_n.jpg?stp=dst-jpg_tt6&cstp=mx206x206&ctp=s200x200&_nc_cat=102&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGwGF4ONy-jCbTDh10q-PbFZjbUZhg5BwlmNtRmGDkHCeFKmaqHlWsJOsWt1UWRAw0MEVjHyjJZxDqaxaM_vkBz&_nc_ohc=BHooeYjtUdgQ7kNvwG81mro&_nc_oc=Adr_qdkD0jW6H2KyqIq6tdWIkWl5FaYEM_uXyGvXNrE6p8kxhCx5YKoUJSCOUuto2_M&_nc_zt=24&_nc_ht=scontent.fmnl9-6.fna&_nc_gid=bAZ9CknqDwgErVLUKfldeA&_nc_ss=7b2a8&oh=00_AQAY5As_qp_2WM40ExIwnBK7y4uGlny6ibOcmPxG1so2dw&oe=6A6CEA5E'}/>
                                                <UserCard userName={'Trisha Wyne Bobis'} followerCount={76} followingCount={3} profileURL={'https://scontent.fmnl9-4.fna.fbcdn.net/v/t39.30808-1/615053689_3027601990963411_2061465663798132513_n.jpg?stp=dst-jpg_tt6&cstp=mx1548x1555&ctp=s100x100&_nc_cat=105&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeF1CpW5UvpC81o6T7elslKpOvfWlZviofM699aVm-Kh81k7Yg7XKRwOeZPPkeNKjK9k_Iv4BxixlVjEdz32C6rs&_nc_ohc=QfOVOhN1yAMQ7kNvwGOpcfh&_nc_oc=AdqXLdO6h8b4DIXL-hWh-PW2sQLOU4SGvgN_xAAiLo7a172Obe6j8_NnpgBHZjMt2VU&_nc_zt=24&_nc_ht=scontent.fmnl9-4.fna&_nc_gid=XWkCZd4Akf5NaJqzAAhWAA&_nc_ss=7b2a8&oh=00_AQBOWtlAFueUjLnDs0YSlRGnsdhuKo93GOsV1NbCN9OFoA&oe=6A6D030D'}/>
                                        </div>
                                </Modal>
                        }

                        {activeModal === 'followings' &&
                                <Modal modalTitle={'Followings'} onClose={() => setActiveModal(null)} >
                                        <div className="user-container">
                                                <UserCard userName={'Audemars Odato'} followerCount={67} followingCount={12} profileURL={'https://scontent.fmnl9-6.fna.fbcdn.net/v/t39.30808-1/636768676_2340190826450286_1542923457919314152_n.jpg?stp=dst-jpg_tt6&cstp=mx206x206&ctp=s200x200&_nc_cat=102&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGwGF4ONy-jCbTDh10q-PbFZjbUZhg5BwlmNtRmGDkHCeFKmaqHlWsJOsWt1UWRAw0MEVjHyjJZxDqaxaM_vkBz&_nc_ohc=BHooeYjtUdgQ7kNvwG81mro&_nc_oc=Adr_qdkD0jW6H2KyqIq6tdWIkWl5FaYEM_uXyGvXNrE6p8kxhCx5YKoUJSCOUuto2_M&_nc_zt=24&_nc_ht=scontent.fmnl9-6.fna&_nc_gid=bAZ9CknqDwgErVLUKfldeA&_nc_ss=7b2a8&oh=00_AQAY5As_qp_2WM40ExIwnBK7y4uGlny6ibOcmPxG1so2dw&oe=6A6CEA5E'}/>
                                                <UserCard userName={'Trisha Wyne Bobis'} followerCount={76} followingCount={3} profileURL={'https://scontent.fmnl9-4.fna.fbcdn.net/v/t39.30808-1/615053689_3027601990963411_2061465663798132513_n.jpg?stp=dst-jpg_tt6&cstp=mx1548x1555&ctp=s100x100&_nc_cat=105&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeF1CpW5UvpC81o6T7elslKpOvfWlZviofM699aVm-Kh81k7Yg7XKRwOeZPPkeNKjK9k_Iv4BxixlVjEdz32C6rs&_nc_ohc=QfOVOhN1yAMQ7kNvwGOpcfh&_nc_oc=AdqXLdO6h8b4DIXL-hWh-PW2sQLOU4SGvgN_xAAiLo7a172Obe6j8_NnpgBHZjMt2VU&_nc_zt=24&_nc_ht=scontent.fmnl9-4.fna&_nc_gid=XWkCZd4Akf5NaJqzAAhWAA&_nc_ss=7b2a8&oh=00_AQBOWtlAFueUjLnDs0YSlRGnsdhuKo93GOsV1NbCN9OFoA&oe=6A6D030D'}/>
                                        </div>
                                </Modal>
                        }
                </section>
        )
}