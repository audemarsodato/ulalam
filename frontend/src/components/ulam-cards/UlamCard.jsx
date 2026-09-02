import useUlamCard from "./useUlamCard"

export default function UlamCard({ ulamName, owner, stats, imageURL, onClick, id }){
        const { openProfile } = useUlamCard(id)

        const handleClick = () => {
                if (!onClick) {
                        openProfile()
                        return
                }

                onClick()
        }

        return (
                <div className="ulam-card" onClick={handleClick}>
                        <div className="image-container">
                                <img src={imageURL} loading="lazy"/>
                        </div>

                        <div className="details">
                                <h1>{ulamName}</h1>
                                { owner &&
                                        <p>By {owner}</p>
                                }
                                { stats &&
                                        <p>
                                                <span class='material-symbols-rounded'>bookmark</span>
                                                 {stats.bookmarks}
                                        </p>
                                }
                        </div>

                        <div className='arrow-forward'>
                                <span className="material-symbols-rounded">arrow_forward_ios</span>                                
                        </div>
                </div>
        )
}