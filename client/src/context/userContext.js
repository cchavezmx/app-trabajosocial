import React, { createContext, useContext } from 'react'
import { Machine, assign } from 'xstate'
import { useMachine } from '@xstate/react'

import authController  from './authController'


const StateContext = createContext();
const DispatchContext = createContext();


export const authMachine = Machine({
    id: 'authMachine',
    initial: 'idle',
    context: {
        user: undefined,
        error: undefined,
    },
    states: {
        idle: {},
        login: {
            id: 'login',
            invoke: {
                id: 'loginData',
                src: authController.login,
                onDone: {
                    target: 'auth',
                    actions: assign({
                        user: (_, event ) => event.data
                    })
                },
                onError:{
                    target: 'error',
                    actions: assign({
                        error: (_, event ) => event.data
                    })
                }
                
            }
        },
        auth: {
            id: 'auth',
            invoke: {
                id: 'authUser',
                src: authController.auth,
                onDone: {
                    target: 'success',
                    actions: assign({
                        user: (_, event) => event.data
                    })
                },
                onError: {
                    target: 'error',
                    actions: assign({
                        error: (_, event) => event.data
                    })
                }
            }
        },
        success: {},
        error: {}
    },
    on:{
        LOGIN: 'login',
        AUTH: 'auth',
    }
})

export const AppSocialProvider  =  ({ children }) => {
    const [ state, dispatch ] = useMachine(authMachine)

    return(
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                { children }
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}

export const useAuthState = () => useContext(StateContext)
export const useAuthDispatch = () => useContext(DispatchContext)