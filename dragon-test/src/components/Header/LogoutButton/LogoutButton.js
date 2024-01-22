import { useAuth0 } from '@auth0/auth0-react'
import "../index.scss"

const LogoutButton = () => {
    const { logout, user, isAuthenticated } = useAuth0()

    return (
        isAuthenticated && (
            <button className='Header-button' onClick={() => logout()}>    
                <p className='Header-button-logout'> {"<<"} Sair</p>
                {user?.picture && <img src={user.picture} alt={user?.name} className='Header-button-image' />}
            </button>
        )
    )
}

export default LogoutButton