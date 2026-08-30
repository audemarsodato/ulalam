import { useState } from 'react'
import { Link } from 'react-router-dom'

import './Signup.css'
import googleIcon from '../../assets/icons/google-icon.svg'
import AuthError from '../../components/auth-error/AuthError'

export default function Signup() {
        const [ email, setEmail ] = useState('')
        const [ password, setPassword ] = useState('')
        const [ confirmPassword, setConfirmPassword ] = useState('')
        const [ error, setError ] = useState(null)

        const handleSubmit = (event) => {
                event.preventDefault()

                if (password.trim() !== confirmPassword.trim()) {
                        setError({message: 'Password does not match'})
                        return
                }

                // signup fetch
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

                        <form className="signup__form">
                                <div className="signup__form__email-input">
                                        <label for='email' className="signup__email label">Email</label>
                                        <input 
                                                type="email" 
                                                name="email" 
                                                id="email" 
                                                className="signup__email input" 
                                                onChange={event => setEmail(event.target.value)}
                                                value={email}
                                        />
                                </div>

                                <div className="signup__form__password-input">
                                        <label for='password' className="signup__password label">Password</label>
                                        <input 
                                                type="password" 
                                                name="password" 
                                                id="password" 
                                                className="signup__password input" 
                                                onChange={event => setPassword(event.target.value)}
                                                value={password}
                                        />
                                </div>

                                <div className="signup__form__confirm-password-input">
                                        <label for='confirm-password' className="signup__confirm-password label">Confirm Password</label>
                                        <input 
                                                type="password" 
                                                name="confirm-password" 
                                                id="confirm-password" 
                                                className="signup__confirm-password input" 
                                                onChange={event => setConfirmPassword(event.target.value)}
                                                value={confirmPassword}
                                        />
                                </div>

                                <button type="submit" onClick={handleSubmit} className='signup__signup-button'>Sign Up</button>
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