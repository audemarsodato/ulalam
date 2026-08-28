import { Link } from 'react-router-dom'

import './Login.css'
import googleIcon from '../../assets/icons/google-icon.svg'

export default function Login() {

        return (
                <section className="login-page">
                        <header className="login-page__header">
                                <h1 className="login__title">Welcome Back!</h1>
                                <h2 className="login__h2">Login</h2>
                        </header>

                        {/* Error message component */}

                        <form className="login__form">
                                <div className="login__form__email-input">
                                        <label for='email' className="login__email label">Email</label>
                                        <input type="email" name="email" id="email" className="login__email input" />
                                </div>
                                <div className="login__form__password-input">
                                        <label for='password' className="login__password label">Password</label>
                                        <input type="password" name="password" id="password" className="login__password input" />
                                </div>

                                <button type="submit" className='login__login-button'>Log In</button>
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