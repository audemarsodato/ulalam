import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import './EmailSentPage.css'
import Header from '../../components/Header'
import useUserContext from '../../hooks/useUserContext'

export default function EmailSentPage() {
        const { user: userDispatch } = useUserContext()
        const [ searchParams ] = useSearchParams()
        const email = searchParams.get('email')
        const [ seconds, setSeconds ] = useState(120)

        useEffect(() => {
                if (seconds <= 0) return

                const timer = setInterval(() => {
                        setSeconds(prev => prev - 1)
                }, 1000)

                return () => clearInterval(timer)
        }, [seconds])

        const resendEmail = async () => {
                setSeconds(120)

                const response = await fetch('/api/v1/auth/verification-email', {
                        method: 'POST',
                        headers: {
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({user})
                })

                const json = await response.json()

                if (!response.ok) {
                        console.log(json)
                        return
                }

                // email resent
        }

        return (
                <section className='email-sent-page'>
                        <header className='page-headers'>
                                <h1 className="email-sent__header">Ulalam</h1>
                        </header>
                        
                        {email ? (
                                <div className='email-sent-container'>
                                        <span class='material-symbols-rounded mail-sent__mail-icon'>mark_email_read</span>
                                        <h2>Verify your email</h2>
                                        <p className='email-sent__prompt'>We have sent a verification email to <span>{email}</span>. Please tap the link inside that email to continue.</p>
                                </div>
                                ) : (
                                        <div className="email-sent__no-email-found">
                                                <h2>No email found!</h2>
                                        </div>
                                )
                        }
                        
                        <div className='email-sent__resend-email'>
                                <p className='email-sent__expiration-counter'>Expires in: {seconds}s</p>
                                <button className='email-sent__resend-email-button' onClick={resendEmail} disabled={seconds !== 0}>Resend email</button>
                        </div>
                </section>
        )
}