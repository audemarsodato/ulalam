import './CheckBox.css'

export default function CheckBox({ label, className }) {

        return (
                <label className={`checkbox ${className}`}>
                        <input type="checkbox" className='checkbox__input' hidden/>
                        <span className='material-symbols-rounded checkbox__checkmark'></span>
                        <span className="checkbox__content">{label}</span>
                </label>
        )
}