
export default function Ingredient({ name, remove }) {

        return (
                <div className="ingredient-chip">
                        <p>{name}</p>

                        {remove &&
                                <button type="button" onClick={remove}>
                                        <span className="material-symbols-rounded">
                                                close
                                        </span>
                                </button>
                        }
                </div>
        )
}