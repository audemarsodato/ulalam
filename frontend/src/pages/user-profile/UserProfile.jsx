import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import './UserProfile.css'

import defaultProfileImage from '../../assets/icons/default-profile-picture.svg'
import Header from "../../components/Header"
import UlamCard from '../../components/ulam-cards/UlamCard'
import SpecialtyCard from '../../components/ulam-cards/SpecialtyCard'
import Modal from "../../components/modal/Modal"
import UserCard from '../../components/UserCard'
import useUserContext from '../../hooks/useUserContext'
import { 
        fetchUserByUsername, 
        fetchCurrentUsersDetails,
        fetchChangeProfileImage
} from '../../services/userService'
import EmptyUlams from '../../components/empty-ulams/EmptyUlams'

export default function UserProfile() {
        const navigate = useNavigate()

        const [ user, setUser ] = useState(null)
        const { user: currentUser, dispatch: userDispatch } = useUserContext()
        const { username: profileOwnerUsername } = useParams()
        const isOwnProfile = currentUser.username === profileOwnerUsername

        const [ isFollowing, setIsFollowing ] = useState(false)
        const [ activeModal, setActiveModal ] = useState(null)
        const [ error, setError ] = useState(null)

        useEffect(() => {
                if (isOwnProfile) {

                        setUser(currentUser)
                        return
                }

                const getUser = async () => {
                        const { user, error } = await fetchUserByUsername({username: profileOwnerUsername, token: currentUser.token})
                        
                        if (error) {
                                setError(error)
                                console.log(error)
                                return
                        }
                        
                        setUser(user)
                }
                getUser()
        }, [])

        
        if (!user) return

        const handleProfileChange = async (event) => {
                const file = event.target.files[0]

                const { profile_image_url, error } = await fetchChangeProfileImage({ imageFile: file, token: user.token }) // user.token ensures that the the user owns the profile

                if (error) {
                        setError(error)
                        console.log(error)
                        return
                }

                setUser(prev => ({...prev, profile_image_url})) 
                userDispatch({type: 'UPDATE', payload: {profile_image_url}}) // this line seems to be crashing the frontend
        }

        const displayPublishedUlams = user.published_ulams.map(ulam => 
                <UlamCard 
                        ulamName={ulam.name} 
                        imageURL={ulam.image_url} 
                        stats={{bookmarks: ulam.bookmarked_by.length, timesCooked: ulam.cooked_count}}
                        id={ulam._id}
                />
        )

        const displaySpecialties = user.earned_specialties.map(ulam =>
                <SpecialtyCard 
                        ulamName={ulam.name} 
                        timesCooked={ulam.times_cooked} 
                        owner={ulam.username} i
                        mageURL={ulam.image_url}
                        id={ulam._id}
                />
        )

        return (
                <section className="user-profile-page">
                        <Header pageTitle={'Profile'} />

                        <section className="profile section">
                                <div className="profile-image">
                                        <div className="profile-image-container">
                                                <img src={user.profile_image_url ? user.profile_image_url : defaultProfileImage}/>
                                        </div>
                                        {isOwnProfile &&
                                                <div className="change-profile">
                                                        <label htmlFor='profile-picture__input'>
                                                                <span class="material-symbols-rounded">edit</span>
                                                        </label>
                                                        <input 
                                                                type="file" 
                                                                id='profile-picture__input' 
                                                                onChange={handleProfileChange}
                                                                accept="image/*"
                                                                loading='lazy'
                                                                hidden
                                                        />
                                                </div>
                                        }
                                </div>

                                <div className="username">
                                        <h1>{user.username}</h1>
                                </div>
                        </section>

                        <section className="stats section">
                                <div className="published stat">
                                        <p className="value">{user.published_ulams.length}</p>
                                        <p>Published</p>
                                </div>
                                <div className="followers stat" onClick={() => setActiveModal('followers')}>
                                        <p className="value">{user.followers.length}</p>
                                        <p>Followers</p>
                                </div>
                                <div className="following stat" onClick={() => setActiveModal('followings')}>
                                        <p className="value">{user.followings.length}</p>
                                        <p>Following</p>
                                </div>
                        </section>

                        <section className="action section">
                                {!isOwnProfile && (
                                        isFollowing ? (
                                                <button className="unfollow-button" onClick={() => setIsFollowing(false)}>
                                                        Following
                                                </button>
                                        ) : (
                                                <button className="follow-button" onClick={() => setIsFollowing(true)}>
                                                Follow
                                                </button>
                                        )
                                )}
                                {/* {isOwnProfile ? (
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
                                )} */}
                        </section>

                        <section className="specialties section">
                                <h2>Specialties</h2>

                                <div className="ulam-container">
                                        {user.earned_specialties.length > 0 ?
                                                displaySpecialties
                                                : (isOwnProfile ?
                                                        <EmptyUlams message={"No specialties yet. Keep cooking your favorite ulams to earn specialties!"} />
                                                        :
                                                        <EmptyUlams message={`${user.username} does not have specialties yet.`} />
                                                )
                                        }  
                                </div>
                        </section>

                        <section className="published-ulams section">
                                <h2>Published Ulams</h2>

                                <div className="ulam-container">
                                        {user.published_ulams.length > 0 ?
                                                displayPublishedUlams
                                                : (isOwnProfile ?
                                                        <EmptyUlams message={"You haven't published any ulams yet."} />
                                                        :
                                                        <EmptyUlams message={`${user.username} haven't published any ulams yet.`} />
                                                )
                                        }
                                </div>
                        </section>

                        {isOwnProfile &&
                                <section className="more-actions section">
                                        <button onClick={() => setActiveModal('bookmarks')} className='more-actions__bookmark'>Bookmarks</button> {/* opens modal */}
                                        <button onClick={() => navigate('/cook/history')}>Cooking History</button>
                                        {/* <button className='danger-button'>Delete account</button> */}
                                        <button className='logout-button danger-button' onClick={() => userDispatch({type: 'LOGOUT'})}>Log out</button>
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