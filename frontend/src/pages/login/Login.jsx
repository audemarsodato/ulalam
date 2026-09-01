import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './Login.css'
import googleIcon from '../../assets/icons/google-icon.svg'
import AuthError from '../../components/auth-error/AuthError'
import useUserContext from '../../hooks/useUserContext'

export default function Login() {
        const { dispatch: userDispatch } = useUserContext()
        const navigate = useNavigate()

        const [ email, setEmail ] = useState('')
        const [ password, setPassword ] = useState('')
        const [ error, setError ] = useState(null)
        const [ isLoading, setIsLoading ] = useState(false)

        const handleLogin = async (event) => {
                event.preventDefault()

                setIsLoading(true)

                const userCredentials = {email, password}

                const response = await fetch('/api/v1/auth/login', {
                        method: 'POST',
                        headers: {
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userCredentials)
                })

                const json = await response.json()

                if (!response.ok) {
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
                
                setIsLoading(false)
                userDispatch({type: 'LOGIN', payload: json.user})
                navigate(`/`)
        }

        return (
                <section className="login-page">
                        <header className="login-page__header">
                                <h1 className="login__title">Welcome Back!</h1>
                                <h2 className="login__h2">Login</h2>
                        </header>

                        {error && 
                                <AuthError message={error.message}/>
                        }

                        <form className="login__form" onSubmit={handleLogin}>
                                <div className="login__form__email-input">
                                        <label for='email' className="login__email label">Email</label>
                                        <input 
                                                type="email" 
                                                name="email" 
                                                id="email" 
                                                className="login__email input"
                                                value={email}
                                                onChange={event => setEmail(event.target.value)}
                                                required
                                        />
                                </div>
                                <div className="login__form__password-input">
                                        <label for='password' className="login__password label">Password</label>
                                        <input 
                                                type="password" 
                                                name="password" 
                                                id="password" 
                                                className="login__password input"
                                                value={password}
                                                onChange={event => setPassword(event.target.value)}
                                                required
                                        />
                                </div>

                                <button type="submit" className='login__login-button' disabled={isLoading}>{isLoading ? 'Logging In...' : 'Log In'}</button>
                        </form>

                        <section className="login__actions">
                                {/* <div className="login__actions-divider">
                                        <hr />
                                        <p className="login__other-options-label">or login with</p>
                                        <hr />
                                </div>

                                <div className="login__other-options">
                                        <button className="login__other-option"><img src={googleIcon} alt="google icon"/></button>
                                        <button className="login__other-option"><p>Guest</p></button>
                                </div> */}

                                <div className="signup__login-prompt">
                                        <p className="signup__login-label">Don't have an account?</p>
                                        <Link className='signup__login-button' to={'/signup'}>Signup</Link>
                                </div>
                        </section>
                </section>
        )
}