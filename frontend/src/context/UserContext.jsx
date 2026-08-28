import { createContext, useEffect, useReducer } from 'react'

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
        const [ state, dispatch ] = useReducer(userReducer, {
                user: null
        })

        useEffect(() => {
                let user = JSON.parse(localStorage.getItem('user'))

                if (user) {
                        dispatch({type: 'LOGIN', payload: user})
                }
        }, [])

        return (
                <UserContext.Provider value={{...state, dispatch}}>
                        {children}
                </UserContext.Provider>
        )
}