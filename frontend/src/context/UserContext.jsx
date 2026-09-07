import { createContext, useEffect, useReducer, useState } from 'react'
import { fetchCurrentUsersDetails } from '../services/userService'

export const UserContext = createContext()

function userReducer(state, action) {
        switch (action.type) {
                case 'LOGIN': 
                        return {user: action.payload}
                case 'LOGOUT':
                        return {user: null}
                case 'UPDATE':
                        return {...state, user: {...state.user, ...action.payload}}
                default:
                        return state
        }
}

export function UserContextProvider({ children }) {
        const [ isInitializing, setIsInitializing ] = useState(true)
        const [ state, dispatch ] = useReducer(userReducer, {
                user: null
        })

        /* 
        *  Handles updates for the localstorage whenn context changes
        */
        useEffect(() => {
                if (isInitializing) return
                
                if (state.user) {
                        localStorage.setItem('user', JSON.stringify(state.user))
                }
        }, [state.user, isInitializing])

        /* 
        *  The purpose of this is to check if there are saved user that has logged in before.
        *  It then log that saved user to the context 
        */
        useEffect(() => {
                const inituser = async () => {
                        let user = JSON.parse(localStorage.getItem('user'))
                        
                        if (!user) {
                                setIsInitializing(false)
                                return
                        }
                        
                        const { user: userSync, error } = await fetchCurrentUsersDetails(user.token)
                        
                        if (error) {
                                setIsInitializing(false)
                                return
                        }

                        dispatch({type: 'LOGIN', payload: {...userSync, token: user.token}})
                        setIsInitializing(false)
                }
                inituser()
        }, [])

        return (
                <UserContext.Provider value={{...state, dispatch, isInitializing}}>
                        {children}
                </UserContext.Provider>
        )
}