
import ReturnButton from "./return-button/ReturnButton"

export default function Header({ pageTitle }) {

        return (
                <header className="page-headers">
                        <ReturnButton />

                        <div className="page-title">
                                <h1>
                                        {pageTitle}
                                </h1>
                        </div>
                </header>
        )
}