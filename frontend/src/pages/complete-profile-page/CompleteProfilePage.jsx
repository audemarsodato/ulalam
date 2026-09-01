import { useState } from 'react'

import './CompleteProfilePage.css'
import defaultProfileImage from '../../assets/icons/default-profile-picture.svg'

export default function CompleteProfilePage() {
        const [ profileImageSrc, setprofileImageSrc ] = useState(null)
        const [ username, setUsername ] = useState('')

        const setPreview = (event) => {
                const file = event.target.files[0]

                const imageSrc = URL.createObjectURL(file)

                setprofileImageSrc(imageSrc)
        }

        const handleProfileSetup = async (event) => {
                event.preventDefault()

                console.log(username)
                // TODO update user's usename and profile image
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
                        </section>
                </section>
        )
}