import { useState } from "react"
import { Link } from "react-router-dom"

import IngredientsList from './components/IngredientsList'
import Finish from './components/Finish'
import Step from './components/Step'

export default function CookUlam() {
        const [ currentStepIndex, setCurrentStepIndex ] = useState(0)

        const ulam = {
                title: 'Sinigang na Bangus',
                ingredients: ['Bangus', 'Sibuyas', 'Kamatis', 'Luya'],
                instructions: [
                        'Linisan at hiwain bangus',
                        'Hiwain at prepare sibuyas, kamatis, luya',
                        'Magpakulo ng water at ilagay na sibuyas kamatis at luya',
                        'Lagay na sinigang mix, bangus, at siling pansigang',
                        'Hayaan maluto bangus',
                        'Timplahan na ng patis',
                        'Lagay na kangkong at pakuluan ng 1 minute',
                        'Serve and ready to eat'
                ]
        }

        const steps = [
                {type: 'ingredients'},
                ...ulam.instructions.map(step => ({type: 'step', instruction: step})),
                {type: 'finish'}
        ]

        const currentStep = steps[currentStepIndex]
        let displayCurrentStep = () => {
                switch(currentStep.type) {
                        case 'ingredients':
                                return <IngredientsList ingredients={ulam.ingredients} />
                                break
                        case 'step':
                                return <Step step={currentStepIndex} instruction={currentStep.instruction} />
                                break
                        case 'finish':
                                return <Finish />
                                break
                }
        }

        
        const moveToNext = () => {
                setCurrentStepIndex(current => Math.min(steps.length - 1, current + 1))
        }
        
        const moveToPrevious = () => [
                setCurrentStepIndex(current => Math.max(0, current - 1))
        ]

        console.log('current step', currentStep)
        console.log('currentStepIndex', currentStepIndex)
        console.log('steps.length', steps.length)
        console.log('steps', steps)

        return (
                <section className="cook-ulam-page">
                        <header className="page-headers">
                                <div className="return-button">
                                        <Link to={'/'}><span className="material-symbols-rounded">arrow_back_ios</span></Link>
                                </div>

                                <div className="step-indicator">
                                        <p>Step {currentStepIndex} of {steps.length - 1}</p>
                                </div>
                        </header>

                        { displayCurrentStep() }

                        <footer className="navigation-buttons">
                                <button className="previous-button" onClick={moveToPrevious}>previous</button>
                                {currentStepIndex === steps.length - 1 ?
                                        <button className="finish-button">FINISH</button>
                                        :
                                        <button className="next-button" onClick={moveToNext}>next</button>
                                }
                        </footer>
                </section>
        )
}