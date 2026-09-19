import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Header from '../components/Header'
import UlamForm from '../components/UlamForm'
import AuthError from '../components/auth-error/AuthError'

import useUserContext from '../hooks/useUserContext'

import { fetchUpdateUlam, fetchUpdateUlamImage, fetchUlam } from '../services/ulamsService'

import { toArray } from '../utils/formatText'
import LoadingSpinner from '../components/loading-spinner/LoadingSpinner'

export default function EditUlam() {
        const navigate = useNavigate()

        const { user, dispatch: userDispatch } = useUserContext()
        const { ulamId } = useParams()
        const [ ulam, setUlam ] = useState(null)

        const [ error, setError ] = useState(null)
        const [ isLoading, setIsLoading ] = useState(false)

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

                        // variation of null === original
                        // variation_of is not null === not original
                        if (ulam.varation_of) {
                                setError({message: 'Cannot create another variation of an ulam that is already a variation'})
                                return
                        }

                        setUlam(ulam)
                        setIsLoading(false)
                }
                getUlam()
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

                console.log(typeof imageFile === 'object')
                if (typeof imageFile === 'object') {
                        const formData = new FormData()
                        formData.append('image-file', imageFile)

                        const { image_url, error } = await fetchUpdateUlamImage({ulamId, formData, token: user.token})

                        if (error) {
                                setError(error)
                                console.log(error)
                                setIsLoading(false)
                                return
                        }
                }

                const ulamData = {
                        name,
                        ingredients,
                        instructions
                }

                const { ulam, error } = await fetchUpdateUlam({ulamId, ulamData, token: user.token})

                if (error) {
                        setError(error)
                        console.log(error)
                        setIsLoading(false)
                        return
                }

                userDispatch({type: 'UPDATE', payload: {published_ulams: [...user.published_ulams, ulam]}})
                setIsLoading(false)
                navigate(`/ulams/${ulam._id}`, {replace: true})
        }

        if (isLoading) return <LoadingSpinner />

        return (
                <section className='create-variation'>
                        <Header pageTitle={'Edit Ulam'}/>

                        {error &&
                                <AuthError message={error.message}/>
                        }
                        {ulam && 
                                <UlamForm ulamData={ulam} mode={'edit'} handleSubmit={handleSubmit} isLoading={isLoading} />
                        }
                </section>
        )
}