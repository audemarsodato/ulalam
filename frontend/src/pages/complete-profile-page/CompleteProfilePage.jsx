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

        return (
                <section className="complete-profile-page">
                        <header className="page-headers">
                                <div className="page-tiltle">
                                        <h1>Complete your profile</h1>
                                </div>
                        </header>

                        <section className="complete-profile__profile-form">
                                <div className="complete-profile__profile-picture">
                                        <div className="complete-profile__profile-picture-container">
                                                <img className="profile-picture__image" src={profileImageSrc ? profileImageSrc : defaultProfileImage} alt="default profile picture" />
                                        </div>
                                        <label htmlFor='profile-picture__input' className='change-profile-image__button'>
                                                {/* <span className="material-symbols-rounded">edit</span>  */}
                                                Change Profile
                                        </label>
                                        <input 
                                                type="file" 
                                                id='profile-picture__input' 
                                                onChange={setPreview}
                                                accept="image/*"
                                                loading='lazy'
                                                hidden
                                        />
                                </div>

                                <form>
                                        <label htmlFor="username-input">Username <span>*</span></label>
                                        <input 
                                                type="text" 
                                                id='username-input' 
                                                onChange={(event => setUsername(event.target.value))} 
                                                value={username}
                                        />
                                </form>

                                <section className="continue">
                                        <button className="continue__button">Continue</button>
                                </section>
                        </section>
                </section>
        )
}