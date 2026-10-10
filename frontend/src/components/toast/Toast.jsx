import useToastContext from '../../hooks/useToastContext'
import './Toast.css'

export default function Toast() {
        const { toastMessage: message } = useToastContext()
       
        return (
                <section className="toast__container">
                        <div className="toast__body">
                                <p className="toast__message">
                                        {message}
                                </p>
                        </div>
                </section>
        )
}