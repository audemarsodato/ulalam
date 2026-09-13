import '../Search.css'

export default function Error({ error }) {
       
        return (
                <div className="empty-state-placeholder">
                        <span class='material-symbols-rounded'>info</span>
                        <p>{error.message}</p>
                </div>
        )
}