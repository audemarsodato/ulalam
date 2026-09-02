
import './EmptyUlams.css'

export default function EmptyUlams({ message }) {
       
        return (
                <section className="empty-ulams-placeholder">
                        <span className='material-symbols-rounded empty-ulams__icon'>no_meals</span>
                        <p className='empty-ulams__message'>{message}</p>
                </section>
        )
}