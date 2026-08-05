import { useEffect, useState } from 'react'

import './Modal.css'

export default function Modal({ modalTitle, onClose, children }) {

        /*
        * Mounts => when conditional rendering, when the condition becomes true and react renders the component
        *       e.g. activeModal === 'followers'
        * Unmounts => when the condition becomes false and react removes the component from the DOM
        *       e.g. activeModal === null
        *
        * condtion becomes true 
        * ↓
        * mount to DOM 
        * ↓
        * run useEffect 
        * ↓
        * condition becomes false 
        * ↓
        * run cleanup function
        * ↓
        * unmount from DOM
        * 
        * useEffect runs once when mounted
        * clean up funtion runs when the component is unmounted from the DOM
        */
        useEffect(() => {
                // runs when the component is mounted
                document.body.style.overflow = 'hidden'
                
                // clean up function, runs before component is unmounted
                return () => {
                        document.body.style.overflow = ''
                }
        }, [])

        return (
                <section className="modal modal-container" onClick={onClose}>
                        <section className="modal__body" onClick={event => event.stopPropagation()}>
                                <header>
                                        <div className="modal__title">
                                                <h1>{modalTitle}</h1>
                                        </div>

                                        <div className="modal__close">
                                                <button onClick={onClose}>
                                                        <span class='material-symbols-rounded'>close</span>
                                                </button>
                                        </div>
                                </header>

                                <div className='modal-content'>
                                        { children }
                                </div>
                        </section>
                </section>
        )
}