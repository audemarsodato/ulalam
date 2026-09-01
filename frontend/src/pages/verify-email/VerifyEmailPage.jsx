import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'

import './VerifyEmailPage.css'

import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner'
import useUserContext from '../../hooks/useUserContext'

export default function VerifyEmailPage() {
        const { dispatch: userDispatch } = useUserContext()
        const [ searchParams ] = useSearchParams()
        const verificationToken = searchParams.get('token')
        const [ isLoading, setIsLoading ] = useState(true)
        const [ error, setError ] = useState(null)

        useEffect(() => {
                const verifyEmail = async () => {
                        setIsLoading(true)

                        const response = await fetch('/api/v1/auth/verify-email', {
                                method: 'POST',
                                headers: {
                                        'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({token: verificationToken})
                        })

                        const json = await response.json()

                        if (!response.ok) {
                                setError(json.error)
                                setIsLoading(false)
                                return
                        }

                        userDispatch({type: 'LOGIN', payload: json})
                        localStorage.setItem('user', JSON.stringify(json))
                        setIsLoading(false)
                }
                verifyEmail()
        }, [])

       
        return (
                <section className='verify-email-page'>
                        <header className='page-headers'>
                                <h1 className='verify-email__header'>Ulalam</h1>
                        </header>

                        {isLoading ? (
                                        <p className="verify-email__loading-prompt">
                                                <LoadingSpinner />
                                                Verifying your email...
                                        </p>
                                ) : !error ? (
                                        <div className="verify-email-container">
                                                <span className='material-symbols-rounded mail-sent__mail-icon'>check_circle</span>
                                                <h2>Email Successfully verified🎉</h2>
                                                <p className='email-sent__prompt'>You can now use Ulalam</p>
                                        </div>
                                ) : (
                                        <div className="verify-email__error-message">
                                                <span className="material-symbols-rounded verify-email__error-icon">cancel</span>
                                                <h2>{error.message}</h2>
                                        </div>
                                )
                        }

                        <div className='verify-email__continue'>
                                <Link to={'/'} className='verify-email__continue__button'>Continue</Link>
                        </div>
                </section>
        )
}