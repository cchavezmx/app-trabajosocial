import React, { createContext, useContext } from 'react'
import { Machine, assign } from 'xstate'
import { useMachine } from '@xstate/react'

import User from './Controller/User'

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
                src: User.login,
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
        success: {},
        error: {},
        auth: {
            id: 'auth',
            invoke: {
                id: 'authUser',
                src: User.auth,
                onDone: {
                    target: 'auth_success',
                    actions: assign({
                        user: (_, event) => event.data
                    })
                },
                onError: {
                    target: 'auth_fail',
                    actions: assign({
                        error: (_, event) => event.data
                    })
                }
            }
        },
        auth_success: {},
        auth_fail: {},
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