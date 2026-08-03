import './UserProfile.css'

import Header from "../../components/Header";

export default function UserProfile() {
       
        return (
                <section className="user-profile-page">
                        <Header pageTitle={'Profile'} />

                        <section className="profile section">
                                <div className="profile-image">
                                        <div className="profile-image-container">
                                                <img src="https://scontent.fmnl9-6.fna.fbcdn.net/v/t39.30808-1/636768676_2340190826450286_1542923457919314152_n.jpg?stp=dst-jpg_tt6&cstp=mx206x206&ctp=s200x200&_nc_cat=102&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGwGF4ONy-jCbTDh10q-PbFZjbUZhg5BwlmNtRmGDkHCeFKmaqHlWsJOsWt1UWRAw0MEVjHyjJZxDqaxaM_vkBz&_nc_ohc=BHooeYjtUdgQ7kNvwG81mro&_nc_oc=Adr_qdkD0jW6H2KyqIq6tdWIkWl5FaYEM_uXyGvXNrE6p8kxhCx5YKoUJSCOUuto2_M&_nc_zt=24&_nc_ht=scontent.fmnl9-6.fna&_nc_gid=bAZ9CknqDwgErVLUKfldeA&_nc_ss=7b2a8&oh=00_AQAY5As_qp_2WM40ExIwnBK7y4uGlny6ibOcmPxG1so2dw&oe=6A6CEA5E" />
                                        </div>
                                        <div className="change-profile">
                                                <button>
                                                        <span class="material-symbols-rounded">edit</span>
                                                </button>
                                        </div>
                                </div>

                                <div className="username">
                                        <h1>Audemars Odato</h1>
                                </div>
                        </section>

                        <section className="stats section">
                                <div className="published stat">
                                        <p className="value">12</p>
                                        <p>Published</p>
                                </div>
                                <div className="followers stat">
                                        <p className="value">3</p>
                                        <p>Followers</p>
                                </div>
                                <div className="following stat">
                                        <p className="value">3</p>
                                        <p>Following</p>
                                </div>
                        </section>

                        <section className="action section">
                                {/* <button className="edit-profile-button">Edit Profile</button> */}
                                <button className="follow-button">Follow</button>
                                {/* <button className="edit-profile-button">Following</button> */}
                        </section>

                        <section className="specialties section">
                                <h2>Specialties</h2>

                                <div className="ulam-container">

                                </div>
                        </section>

                        <section className="published-ulams section">
                                <h2>Published Ulams</h2>

                                <div className="ulam-container">

                                </div>
                        </section>

                        {/* If own profile */}
                        <section className="more-actions section">
                                <button>Bookmarks</button>
                                <button>Cooking History</button>
                                <button>Log out</button>
                        </section>
                </section>
        )
}