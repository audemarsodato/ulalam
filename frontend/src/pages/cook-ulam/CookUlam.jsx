import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import './CookUlam.css'

import IngredientsList from './components/IngredientsList'
import Finish from './components/Finish'
import Step from './components/Step'
import ReturnButton from '../../components/return-button/ReturnButton'

import { fetchUlam } from "../../services/ulamsService"
import { fetchRecordSession, getCookingTimeDuration } from "../../services/coookingLogsService"

import useUserContext from '../../hooks/useUserContext'

import { minimumCookingTimeMinutes } from "../../config/config"

export default function CookUlam() {
        const navigate = useNavigate()

        /*
        *  Record and keep note of start time
        *  If the ulam is cooked less than 5 minutes dont record the ulamm as it is not really cooked
        */

        const { user } = useUserContext()
        const { ulamId } = useParams()
        const [ ulam, setUlam ] = useState(null)
        const startTime = new Date()

        const [ currentStepIndex, setCurrentStepIndex ] = useState(0)
        const [ error, setError ] = useState(null)
        const [ isLoading, setIsLoading ] = useState(false)
        const [ isFetchRecording, settIsFetchRecording ] = useState(false)


        useEffect(() => {
                const getUlam = async () => {
                        setIsLoading(true)
                        
                        const { ulam, error } = await fetchUlam({ulamId, token: user.token})

                        if (error) {
                                setError(error)
                                console.log(error)
                                setIsLoading(false)
                                return
                        }

                        setUlam(ulam)
                        setIsLoading(false)
                }
                getUlam()
        }, [ulamId])

        if (!ulam) return

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
                                return <Finish ulam={ulam} />
                                break
                }
        }

        
        const moveToNext = () => {
                setCurrentStepIndex(current => Math.min(steps.length - 1, current + 1))
        }
        
        const moveToPrevious = () => {
                setCurrentStepIndex(current => Math.max(0, current - 1))
        }

        const doneCooking = async () => {
                settIsFetchRecording(true)

                const cookingTimeDurationMinutes = getCookingTimeDuration(startTime)

                if (cookingTimeDurationMinutes < minimumCookingTimeMinutes) {
                        setError({message: 'Invalid cooking session. Cooking time duration is too short to be valid.'})
                        console.log('INVALID COOKING SESSION')
                        // navigate('/')
                        return
                }

                const { record, error } = await fetchRecordSession({ulamId, token: user.token})

                if (error) {
                        setError(error)
                        console.log(error)
                        settIsFetchRecording(true)
                        return
                }

                settIsFetchRecording(true)
                navigate('/')
        }

        return (
                <section className="cook-ulam-page">
                        <header className="page-headers">
                                <ReturnButton />

                                <div className="step-indicator">
                                        <p>Step {currentStepIndex} of {steps.length - 1}</p>
                                </div>
                        </header>
                        
                        { displayCurrentStep() }

                        <footer className="navigation-buttons">
                                <button className="previous-button" onClick={moveToPrevious}>Previous</button>
                                {currentStepIndex === steps.length - 1 ?
                                        <button className="finish-button" onClick={doneCooking}>Done</button>
                                        :
                                        <button className="next-button" onClick={moveToNext}>Next</button>
                                }
                        </footer>
                </section>
        )
}