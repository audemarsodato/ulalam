import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './Signup.css'
import googleIcon from '../../assets/icons/google-icon.svg'
import AuthError from '../../components/auth-error/AuthError'
import useUserContext from '../../hooks/useUserContext'

export default function Signup() {
        const { dispatch: userDispatch } = useUserContext()
        const navigate = useNavigate()

        const [ email, setEmail ] = useState()
        const [ password, setPassword ] = useState()
        const [ confirmPassword, setConfirmPassword ] = useState()
        const [ error, setError ] = useState(null)
        const [ isLoading, setIsLoading ] = useState(false)
        const [ missingFields, setMissingFields ] = useState([])

        const handleSignup = async (event) => {
                event.preventDefault()

                setIsLoading(true)

                if (password.trim() !== confirmPassword.trim()) {
                        setError({message: 'Password does not match'})
                        setIsLoading(false)
                        return
                }

                const userCredentials = {
                        email,
                        password,
                        username: email.split('@')[0]
                }

                const response = await fetch('/api/v1/auth/signup', {
                        method: 'POST',
                        headers: {
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userCredentials)
                })

                const json = await response.json()

                if (!response.ok) {
                        setError(json.error)
                        setIsLoading(false)
                        if (json.error.missingFields) setMissingFields(json.error.missingFields)
                        console.log(json)
                        return
                }
                
                userDispatch({type: 'LOGIN', payload: json.user})
                navigate(`/email-sent?email=${json.user.email}`)
                setIsLoading(false)
        }

        return (
                <section className="signup-page">
                        <header className="signup-page__header">
                                <h1 className="signup__title">Welcome!</h1>
                                <h2 className="signup__h2">Create Account</h2>
                        </header>

                        {error && 
                                <AuthError message={error.message}/>
                        }

                        <form className="signup__form" onSubmit={handleSignup}>
                                <div className="signup__form__email-input">
                                        <label for='email' className="signup__email label">Email</label>
                                        <input 
                                                type="email" 
                                                name="email" 
                                                id="email" 
                                                className={`signup__email input ${missingFields.includes('email') ? 'border-red' : ''}`}
                                                onChange={event => setEmail(event.target.value)}
                                                value={email}
                                                required
                                        />
                                </div>

                                <div className="signup__form__password-input">
                                        <label for='password' className="signup__password label">Password</label>
                                        <input 
                                                type="password" 
                                                name="password" 
                                                id="password" 
                                                className={`signup__password input ${missingFields.includes('password') ? 'border-red' : ''}`}
                                                onChange={event => setPassword(event.target.value)}
                                                value={password}
                                                required
                                        />
                                </div>

                                <div className="signup__form__confirm-password-input">
                                        <label for='confirm-password' className="signup__confirm-password label">Confirm Password</label>
                                        <input 
                                                type="password" 
                                                name="confirm-password" 
                                                id="confirm-password" 
                                                className={`signup__confirm-password input ${missingFields.includes('password') ? 'border-red' : ''}`}
                                                onChange={event => setConfirmPassword(event.target.value)}
                                                value={confirmPassword}
                                                required
                                        />
                                </div>

                                <button type="submit" className='signup__signup-button' disabled={isLoading}>{isLoading ? 'Signing up...' : 'Sign Up'}</button>
                        </form>

                        <section className="signup__actions">
                                {/* <div className="signup__actions-divider">
                                        <hr />
                                        <p className="signup__other-options-label">or signup with</p>
                                        <hr />
                                </div>

                                <div className="signup__other-options">
                                        <button className="signup__other-option"><img src={googleIcon} alt="google icon"/></button>
                                        <button className="signup__other-option"><p>Guest</p></button>
                                </div> */}

                                <div className="signup__login-prompt">
                                        <p className="signup__login-label">Already have an account?</p>
                                        <Link className='signup__login-button' to={'/login'}>Login</Link>
                                </div>
                        </section>
                </section>
        )
}