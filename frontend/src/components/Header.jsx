import { Link } from 'react-router-dom'

export default function Header({ pageTitle }) {

        return (
                <header className="page-headers">
                        <div className="return-button">
                                <Link to={'/'}><span className="material-symbols-rounded">arrow_back_ios</span></Link>
                        </div>

                        <div className="page-title">
                                <h1>
                                        {pageTitle}
                                </h1>
                        </div>
                </header>
        )
}