import { useNavigate } from 'react-router-dom'

export default function ReturnButton() {
        const navigate = useNavigate()

        const returnBack = () => {
                navigate(-1)
        }
       
        return (
                <div className="return-button">
                        <button onClick={returnBack}><span className="material-symbols-rounded">arrow_back_ios</span></button>
                </div>       
        )
}