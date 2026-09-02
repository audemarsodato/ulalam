import { createContext, useEffect, useReducer, useState } from 'react'

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

        useEffect(() => {
                if (isInitializing) return
                
                if (!state.user) {
                        localStorage.removeItem('user')
                        return
                }
                localStorage.setItem('user', JSON.stringify(state.user))
        }, [state.user])

        /* 
        *  The purpose of this is to check if there are saved user that has logged in before.
        *  It then log that saved user to the context 
        */
        useEffect(() => {
                let user = JSON.parse(localStorage.getItem('user'))
                
                if (user) dispatch({type: 'LOGIN', payload: user})
                
                setIsInitializing(false)
        }, [])

        return (
                <UserContext.Provider value={{...state, dispatch, isInitializing}}>
                        {children}
                </UserContext.Provider>
        )
}