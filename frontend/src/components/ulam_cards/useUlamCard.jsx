import { useNavigate } from "react-router-dom";

export default function useUlamCard(ulamId) {
        const navigate = useNavigate()

        const openProfile = () => {
                navigate(`/ulams/${ulamId}`)
        }

        return {
                openProfile
        }
}