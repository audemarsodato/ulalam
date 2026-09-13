import { useNavigate } from "react-router-dom";

export default function useUserCard(username) {
        const navigate = useNavigate()

        const openProfile = () => {
                navigate(`/users/${username}`)
        }

        return {
                openProfile
        }
}