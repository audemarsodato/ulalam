import { createContext, useEffect, useState } from 'react'

export const ToastContext = createContext()

export function ToastContextProvider({ children }) {
        const [ toastMessage, setToastMessage ] = useState(null)

        useEffect(() => {
                if (!toastMessage) return

                setTimeout(() => {
                        setToastMessage(null)
                }, 3500)
        }, [toastMessage])

        return (
                <ToastContext.Provider value={{toastMessage, setToastMessage}}>
                        {children}
                </ToastContext.Provider>
        )
}