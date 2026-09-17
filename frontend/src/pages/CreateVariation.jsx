import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import Header from "../components/Header"
import UlamForm from "../components/UlamForm"
import AuthError from "../components/auth-error/AuthError"

import useUserContext from "../hooks/useUserContext"

import { fetchCreateUlam, fetchUlam } from "../services/ulamsService"

import { toArray } from '../utils/formatText'
import LoadingSpinner from "../components/loading-spinner/LoadingSpinner"

export default function CreateVariation() {
        const navigate = useNavigate()
        
        const { user, dispatch: userDispatch } = useUserContext()
        const { ulamId } = useParams()
        const [ varationOf, setVariationOf ] = useState(null)

        const [ error, setError ] = useState(null)
        const [ isLoading, setIsLoading ] = useState(false)

        useEffect(() => {
                const getVariationOfUlam = async () => {
                        setIsLoading(true)
                        
                        const { ulam, error } = await fetchUlam({ulamId, token: user.token})

                        if (error) {
                                setError(error)
                                console.log(error)
                                setIsLoading(false)
                                return
                        }

                        // variation of null === original
                        // variation_of is not null === not original
                        if (ulam.varation_of) {
                                setError({message: 'Cannot create another variation of an ulam that is already a variation'})
                                return
                        }

                        console.log(ulam)
                        setVariationOf(ulam)
                        setIsLoading(false)
                }
                getVariationOfUlam()
        }, [])

        const handleSubmit = async (event, { name, imageFile, ingredients, instructionsText, imageSrc }) => {
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
                formData.append('image_url', imageFile)
                formData.append('image-file', imageFile)
                formData.append('variation_of', ulamId)

                const { ulam, error: errorResponse } = await fetchCreateUlam({formData, token: user.token})

                if (errorResponse) {
                        setError(errorResponse)
                        console.log(errorResponse)
                        setIsLoading(false)
                        return
                }

                userDispatch({type: 'UPDATE', payload: {published_ulams: [...user.published_ulams, ulam]}})
                setIsLoading(false)
                navigate(`/ulams/${ulam._id}`, {replace: true})
        }

        if (isLoading) return <LoadingSpinner />

        return (
                <section className="create-variation">
                        <Header pageTitle={'Publish Variation'}/>

                        {error &&
                                <AuthError message={error.message}/>
                        }
                        {varationOf && 
                                <UlamForm ulamData={varationOf} mode={'variation'} handleSubmit={handleSubmit} isLoading={isLoading} />
                        }
                </section>

        )
}