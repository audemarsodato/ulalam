
export default function Day({ weekday, monthday, onclick, isActive }) {
       
        return (
                <div className={`day-container ${isActive ? 'active' : ''}`} onClick={onclick}>
                        <p className="day-of-week">{weekday}</p>
                        <p className="day-of-month">{monthday}</p>
                </div>
        )
}