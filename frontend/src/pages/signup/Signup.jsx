import { Link } from 'react-router-dom'

import './Signup.css'
import googleIcon from '../../assets/icons/google-icon.svg'

export default function Signup() {

        return (
                <section className="signup-page">
                        <header className="signup-page__header">
                                <h1 className="signup__title">Welcome!</h1>
                                <h2 className="signup__h2">Create Account</h2>
                        </header>

                        {/* Error message component */}

                        <form className="signup__form">
                                <div className="signup__form__email-input">
                                        <label for='email' className="signup__email label">Email</label>
                                        <input type="email" name="email" id="email" className="signup__email input" />
                                </div>
                                <div className="signup__form__password-input">
                                        <label for='password' className="signup__password label">Password</label>
                                        <input type="password" name="password" id="password" className="signup__password input" />
                                </div>
                                <div className="signup__form__confirm-password-input">
                                        <label for='confirm-password' className="signup__confirm-password label">Confirm Password</label>
                                        <input type="password" name="confirm-password" id="confirm-password" className="signup__confirm-password input" />
                                </div>

                                <button type="button" className='signup__signup-button'>CREATE ACCOUNT</button>
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