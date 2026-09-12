import { Outlet, Navigate } from 'react-router-dom'
import useUserContext from '../../hooks/useUserContext'
import LoadingSpinner from '../loading-spinner/LoadingSpinner'

export default function ProtectedRoutes() {
        const { user, isInitializing } = useUserContext()

        if (isInitializing) return <div className="init-state"><LoadingSpinner /></div>

        return user && user.email_verified ? <Outlet /> : <Navigate to={'/login'}/>
}