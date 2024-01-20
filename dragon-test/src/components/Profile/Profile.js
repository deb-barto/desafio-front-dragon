import { useAuth0 } from '@auth0/auth0-react';
import "./index.scss"

const Profile = () => {
    const { user, isAuthenticated } = useAuth0()

    return (
        isAuthenticated && (
            <div className='Profile'>
                <div className='Profile-Content'>
                    <article className='Profile-Group'>
                        {user?.picture && 
                        <img src={user.picture} alt={user?.name} className='Profile-Img' />}
                        <h2 className='Profile-Name'>{user?.name}</h2>
                    </article>
               </div>
            </div>
        )
    )
}

export default Profile