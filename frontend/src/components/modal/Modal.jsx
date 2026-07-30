
export default function Modal({ children }) {

        return (
                <section className="modal-container">
                        <section className="modal-body">
                                { children }
                        </section>
                </section>
        )
}