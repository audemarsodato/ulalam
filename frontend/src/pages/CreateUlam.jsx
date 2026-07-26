import Header from "../components/Header"
import UlamForm from "../components/UlamForm"

export default function CreateUlam() {

        return (
                <section className="create-ulam-page">
                        <Header pageTitle={"Publish Ulam"} />

                        <UlamForm />
                </section>
        )
}