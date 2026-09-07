import { useNavigate } from "react-router-dom"
import { useState } from "react"

import Header from "../components/Header"
import UlamForm from "../components/UlamForm"
import AuthError from '../components/auth-error/AuthError'
import { fetchCreateUlam } from "../services/ulamsService"
import useUserContext from '../hooks/useUserContext'
import { toArray } from '../utils/formatText'

export default function CreateUlam() {
        const navigate = useNavigate()

        const { user, dispatch: userDispatch } = useUserContext()
        const [ error, setError ] = useState(null)
        const [ isLoading, setIsLoading ] = useState(false)

        const handleSubmit = async (event, { name, imageFile, ingredients, instructionsText }) => {
                event.preventDefault()

                setIsLoading(true)

                const instructions = toArray(instructionsText)

                if (!name) {
                        setError({message: 'Ulam name is required'})
                        setIsLoading(false)
                        return
                }
                if (!imageFile) {
                        setError({message: 'Ulam image is required'})
                        setIsLoading(false)
                        return
                }
                if (!ingredients.length === 0) {
                        setError({message: 'Ingredients is required'})
                        setIsLoading(false)
                        return
                }
                if (!instructions.length === 0) {
                        setError({message: 'Instructions is required'})
                        setIsLoading(false)
                        return
                }

                const formData = new FormData()
                formData.append('name', name)
                formData.append('ingredients', JSON.stringify(ingredients))
                formData.append('instructions', JSON.stringify(instructions))
                formData.append('image-file', imageFile)

                console.log({ name, imageFile, ingredients, instructions })
                console.log(formData)

                const { ulam, error: errorResponse } = await fetchCreateUlam({formData, token: user.token})

                if (errorResponse) {
                        setError(errorResponse)
                        console.log(errorResponse)
                        setIsLoading(false)
                        return
                }

                userDispatch({type: 'UPDATE', payload: {published_ulams: [...user.published_ulams, ulam]}})
                setIsLoading(false)
                navigate(`/ulams/${ulam._id}`)
        }

        return (
                <section className="create-ulam-page">
                        <Header pageTitle={"Publish Ulam"} />

                        {error &&
                                <AuthError message={error.message}/>
                        }
                        <UlamForm handleSubmit={handleSubmit} isLoading={isLoading}/>
                </section>
        )
}