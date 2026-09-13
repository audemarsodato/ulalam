import useUserCard from './useUserCard'

export default function UserCard({ user }){
        const { openProfile } = useUserCard(user.username)

        // user._id
        return (
                <div className="user-card" onClick={openProfile}>
                        <div className="image-container">
                                <img src={user.profile_image_url} loading="lazy"/>
                        </div>

                        <div className="details">
                                <h1>{user.username}</h1>
                                <p>{user.followers.length} Followers - {user.followings.length} Followings</p>
                        </div>

                        <div className='arrow-forward'>
                                <span className="material-symbols-rounded">arrow_forward_ios</span>                                
                        </div>
                </div>
        )
}