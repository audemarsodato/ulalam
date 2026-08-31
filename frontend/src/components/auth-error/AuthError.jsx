import './AuthError.css'

export default function AuthError({ message }) {

        return (
                <section className="auth-error-card">
                        <span className="material-symbols-rounded">cancel</span>
                        <p className="error-card__message">{message ? message : 'Something went wrong'}</p>
                </section>
        )
}