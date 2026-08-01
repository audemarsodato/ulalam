import './CookingHistory.css'

import Header from "../../components/Header"
import DailyHistory from "./components/DailyHistory"

export default function CookingHistory() {

        return (
                <section className="history-page">
                        <Header pageTitle={'Cooking History'}/>

                        <section className="history">
                                <DailyHistory date={'Today, July 19'}/>
                                <DailyHistory date={'Yesterday, July 18'}/>
                                <DailyHistory date={'Monday, July 17'}/>
                        </section>

                        <footer className="load-more">
                                <p>Load more</p>
                        </footer>
                </section>
        )
}