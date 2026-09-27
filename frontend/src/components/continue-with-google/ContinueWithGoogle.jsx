import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import './ContinueWithGoogle.css'
import googleIcon from '../../assets/icons/google-icon.svg'
import useUserContext from '../../hooks/useUserContext'

export default function ContinueWithGoogle({ setIsLoading, setError }) {
        const continueButtonRef = useRef(null)
        const navigate = useNavigate()

        const { user, dispatch: userDispatch } = useUserContext()

        useEffect(() => {
                google.accounts.id.initialize({
                        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                        callback: handleGoogleResponse,
                        use_fedcm_for_button: true
                })

                google.accounts.id.renderButton(continueButtonRef.current, {
                        theme: 'outline',
                        size: 'large',
                        text: 'continue_with'
                })
        }, [])

        const handleGoogleResponse = async (response) => {
                const { credential } = response

                const fetchResponse = await fetch('/api/v1/auth/google', {
                        method: 'POST',
                        headers: {
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({credential})
                })

                const json = await fetchResponse.json()

                if (!fetchResponse.ok) {
                        setIsLoading(false)
                        setError(json.error)
                        console.log(json)
                        
                        if (json.error.code === 'EMAIL_NOT_VERIFIED') {
                                setTimeout(() => {
                                        console.log('set time out')
                                        console.log(json)
                                        navigate(`/email-sent?email=${json.error.payload.email}`)
                                }, 3000)
                        }
                        return
                }

                console.log(json)

                userDispatch({type: 'LOGIN', payload: json})
                localStorage.setItem('user', JSON.stringify(json))
                navigate(`/`)
        }
       
        return <div className="continue-button" ref={continueButtonRef}></div>

        // return (
                // <button className="continue-with-google" onClick={handleContinueWithGoogle}>
                //         <img src={googleIcon} alt="continue-with-google__icon"/> 
                //         <p>Continue with Google</p>
                // </button>
        // )
}