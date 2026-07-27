
export default function UserCard({ userName, followerCount, followingCount, profileURL}){

        return (
                <div className="user-card">
                        <div className="image-container">
                                <img src={profileURL} loading="lazy"/>
                        </div>

                        <div className="details">
                                <h1>{userName}</h1>
                                <p>{followerCount} Followers - {followingCount} Followings</p>
                        </div>

                        <div className='arrow-forward'>
                                <span className="material-symbols-rounded">arrow_forward_ios</span>                                
                        </div>
                </div>
        )
}