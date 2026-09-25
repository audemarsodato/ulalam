import { Link } from 'react-router-dom'

import './PageNotFound.css'

export default function PageNotFound() {
       
        return (
                <section className="page-not-found">
                        <h1 className="page-not-found__title">404</h1>
                        <p className="page-not-found__description">Oops! Page not found.</p>
                        <br />
                        <Link to={'/'}>Home</Link>
                </section>
        )
}