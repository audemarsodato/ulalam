import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import './VerifyEmailPage.css'

import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner'

export default function VerifyEmailPage() {
        const [ searchParams ] = useSearchParams()
        const verificationToken = searchParams.get('token')
        const [ isLoading, setIsLloading ] = useState(false)

        // useEffect(() => {
        //         // fetch verify email and pass token
        //         // set is loading to true
        //         // returns jwt token
        //         // set is loading false
        // }, [])

       
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
                                ) : (
                                        <div className="verify-email-container">
                                                <span class='material-symbols-rounded mail-sent__mail-icon'>mark_email_read</span>
                                                <h2>Email Successfully verified🎉</h2>
                                                <p className='email-sent__prompt'>You can now use Ulalam</p>
                                        </div>
                        )}

                        <div className='verify-email__continue'>
                                <button className='verify-email__continue__button'>Continue</button>
                        </div>
                </section>
        )
}