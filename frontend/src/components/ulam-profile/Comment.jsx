
export default function Comment({ user, timestamp, message}) {

        return (
                <div className="comment">
                        <div className="details">
                                <h3>{user}</h3>
                                <p>{timestamp}</p>
                        </div>

                        <div className="message">
                                <p>{message}</p>
                        </div>
                </div>
        )
}