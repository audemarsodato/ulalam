import { createContext, useEffect, useReducer, useState } from 'react'

export const UserContext = createContext()

function userReducer(state, action) {
        switch (action.type) {
                case 'LOGIN': 
                        return {user: action.payload}
                case 'LOGOUT':
                        return {user: null}
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
                let user = JSON.parse(localStorage.getItem('user'))
                
                if (user) {
                        dispatch({type: 'LOGIN', payload: user})
                }
                
                setIsInitializing(false)
        }, [])

        return (
                <UserContext.Provider value={{...state, dispatch, isInitializing}}>
                        {children}
                </UserContext.Provider>
        )
}