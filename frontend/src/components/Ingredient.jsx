
export default function Ingredient({ name, remove }) {

        return (
                <div className="ingredient-chip">
                        <p>{name}</p>
                        <button type="button">
                                <span className="material-symbols-rounded">
                                        close
                                </span>
                        </button>
                </div>
        )
}