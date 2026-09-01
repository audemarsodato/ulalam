import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './CompleteProfilePage.css'
import defaultProfileImage from '../../assets/icons/default-profile-picture.svg'
import useUserContext from '../../hooks/useUserContext'
import AuthError from '../../components/auth-error/AuthError'

export default function CompleteProfilePage() {
        const navigate = useNavigate()

        const { user } = useUserContext()
        const [ profileImage, setProfileImage ] = useState(null)
        const [ profileImageSrc, setprofileImageSrc ] = useState(null)
        const [ username, setUsername ] = useState('')
        const [ error, setError ] = useState(null)

        const setPreview = (event) => {
                const file = event.target.files[0]

                if (!file) return

                setProfileImage(file)

                const imageSrc = URL.createObjectURL(file) // TODO cleanup

                setprofileImageSrc(imageSrc)
        }

        const handleProfileSetup = async (event) => {
                event.preventDefault()

                if (!username) return // TODO set globbal error

                if (profileImage) {
                        const formData = new FormData()
                        formData.append('profile-image', profileImage)
                        const profileImageResponse = await fetch('/api/v1/users/me/profile-image', {
                                method: 'PATCH',
                                headers: {
                                        authorization: `Bearer ${user.token}`
                                },
                                body: formData
                        })

                        const profileImageJson = await profileImageResponse.json()

                        if (!profileImageResponse.ok) {
                                setError(profileImageJson.error)
                                return
                        }
                }

                const usernameResponse = await fetch('/api/v1/users/me', {
                        method: 'PATCH',
                        headers: {
                                'Content-Type': 'application/json',
                                authorization: `Bearer ${user.token}`
                        },
                        body: JSON.stringify({updates: {username}})
                })

                const usernameJson = await usernameResponse.json()

                // TODO response not ok handler
                if (!usernameResponse.ok) {
                        setError(usernameJson.error)
                        return
                }

                // TODO update user from the context

                navigate('/')
        }

        return (
                <section className="complete-profile-page">
                        <header className="page-headers">
                                <div className="page-tiltle">
                                        <h1>Complete your profile</h1>
                                </div>
                        </header>

                        <section className="complete-profile__profile-form">
                                <section className="complete-profile__profile-picture-section">
                                        <div className="complete-profile__profile-image">
                                                <div className="complete-profile__profile-picture-container">
                                                        <img className="profile-picture__image" src={profileImageSrc ? profileImageSrc : defaultProfileImage} alt="default profile picture" />
                                                </div>
                                                <label htmlFor='profile-picture__input' className='change-profile-image__label'>
                                                        <span className="material-symbols-rounded">edit</span> 
                                                        {/* Change Profile */}
                                                </label>
                                        </div>
                                        <input 
                                                type="file" 
                                                id='profile-picture__input' 
                                                onChange={setPreview}
                                                accept="image/*"
                                                loading='lazy'
                                                hidden
                                        />
                                </section>


                                <form className='complete-profile__form' onSubmit={handleProfileSetup}>
                                        <label className='complete-profile__username-label' htmlFor="username-input">Username <span>*</span></label>
                                        <input 
                                                type="text" 
                                                id='username-input' 
                                                onChange={(event => setUsername(event.target.value))} 
                                                value={username}
                                                className='complete-profile__username-input'
                                                required
                                                // placeholder='Taga Saing'
                                        />

                                        <section className="complete-profile__continue">
                                                <button type='submit' className="complete-profile__continue-button">Complete</button>
                                        </section>
                                </form>
                                
                                {error &&
                                        <AuthError message={error.message}/>
                                }
                        </section>
                </section>
        )
}