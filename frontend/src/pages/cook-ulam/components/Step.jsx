
export default function Step({ step, instruction }) {

        return (
                <section className="step">
                        <div className="step-header">
                                <h1>{step}</h1>
                        </div>

                        <div className="step-container">
                                <h2>{instruction}</h2>
                        </div>
                </section>
        )
}