
export default function Stat({ value, icon, title }) {

        return (
                <div className="stat">
                        <p className="value">{value}</p>
                        <p className="title">
                                <span className="material-symbols-rounded">{icon}</span>
                                <p>{title}</p>
                        </p>
                </div>
        )
}