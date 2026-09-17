import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import './UserProfile.css'

import defaultProfileImage from '../../assets/icons/default-profile-picture.svg'

import Header from "../../components/Header"
import UlamCard from '../../components/ulam-cards/UlamCard'
import SpecialtyCard from '../../components/ulam-cards/SpecialtyCard'
import Modal from "../../components/modal/Modal"
import UserCard from '../../components/user-card/UserCard'
import EmptyUlams from '../../components/empty-ulams/EmptyUlams'
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner'

import useUserContext from '../../hooks/useUserContext'

import { 
        fetchUserByUsername, 
        fetchCurrentUsersDetails,
        fetchChangeProfileImage,
        fetchFollowUser,
        fetchUnfollowUser
} from '../../services/userService'

export default function UserProfile() {
        const navigate = useNavigate()

        const [ user, setUser ] = useState(null)
        const { user: currentUser, dispatch: userDispatch } = useUserContext()
        const { username: profileOwnerUsername } = useParams()
        const isOwnProfile = currentUser.username === profileOwnerUsername

        const [ isFollowing, setIsFollowing ] = useState(false)
        const [ isFollowLoading, setIsFollowLoading ] = useState(false)
        const [ activeModal, setActiveModal ] = useState(null)
        const [ error, setError ] = useState(null)

        useEffect(() => {
                setUser(null)
                setActiveModal(null)

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
                        
                        for (const follower of user.followers) {
                                if (follower._id === currentUser._id) setIsFollowing(true)
                        }
                }
                getUser()
        }, [profileOwnerUsername])

        // Debugging
        useEffect(() => {
                console.log({user})
        }, [user])

        
        if (!user) return

        const handleUnfollow = async () => {
                setIsFollowLoading(true)

                const { user: followedUser, error } = await fetchUnfollowUser({userId: user._id, token: currentUser.token})

                if (error) {
                        setIsFollowLoading(false)
                        setError(error)
                        console.log(error)
                        return
                }

                setUser(current => ({...current, followers: current.followers.filter(follower => follower._id !== currentUser._id)}))
                setIsFollowing(false)
                setIsFollowLoading(false)
        }

        const handleFollow = async () => {
                setIsFollowLoading(true)

                const { user: followedUser, error } = await fetchFollowUser({userId: user._id, token: currentUser.token})

                if (error) {
                        setIsFollowLoading(false)
                        setError(error)
                        console.log(error)
                        return
                }

                setUser(current => ({...current, followers: [...current.followers, currentUser]}))
                setIsFollowing(true)
                setIsFollowLoading(false)
        }

        const logout = () => {
                userDispatch({type: 'LOGOUT'})
                localStorage.removeItem('user')
        }

        const handleProfileChange = async (event) => {
                const file = event.target.files[0]

                const { profile_image_url, error } = await fetchChangeProfileImage({ imageFile: file, token: user.token }) // user.token ensures that the the user owns the profile

                if (error) {
                        setError(error)
                        console.log(error)
                        return
                }

                setUser(prev => ({...prev, profile_image_url})) 
                userDispatch({type: 'UPDATE', payload: {profile_image_url}}) 
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
                        imageURL={ulam.image_url}
                        id={ulam._id}
                />
        )

        const displayFollowers = user.followers.map(user => 
                <UserCard user={user}/>
        )

        const displayFollowings = user.followings.map(user => 
                <UserCard user={user}/>
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
                                                <button className="unfollow-button" onClick={handleUnfollow} disabled={isFollowLoading}>
                                                        {isFollowLoading ? 'Unfolling...' : 'Following' }
                                                </button>
                                        ) : (
                                                <button className="follow-button" onClick={handleFollow} disabled={isFollowLoading}>
                                                        {isFollowLoading ? 'Following...' : 'Follow' }
                                                </button>
                                        )
                                )}
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
                                        <button className='logout-button danger-button' onClick={logout}>Log out</button>
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
                                                {displayFollowers}
                                        </div>
                                </Modal>
                        }

                        {activeModal === 'followings' &&
                                <Modal modalTitle={'Followings'} onClose={() => setActiveModal(null)} >
                                        <div className="user-container">
                                                {displayFollowers}
                                        </div>
                                </Modal>
                        }
                </section>
        )
}