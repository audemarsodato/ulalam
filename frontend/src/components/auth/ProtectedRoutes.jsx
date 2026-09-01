import { Outlet, Navigate } from 'react-router-dom'
import useUserContext from '../../hooks/useUserContext'

export default function ProtectedRoutes() {
        const { user } = useUserContext()

        return user && user.email_verified ? <Outlet /> : <Navigate to={'/login'}/>
}