import { Machine, assign } from 'xstate'
import axios from 'axios'
import { Error } from 'mongoose'

const api = axios.create({
    baseURL: 'http://localhost:4000/app/pacientes'
})

const usersData = async(context, event ) => {
    
    let errors = {}
    
    const data = await api.post('/register', event.payload )
    .then(res => res)
    .catch(err => errors = err.response.data)

    if(data.status === 200){
        return data.data.message
    }else if(Object.entries(Object.entries(errors.errors).length === 1)){
        console.log(data)
        throw new Error(JSON.stringify(data))
    }
}

const notaAndNewUser = async(context, event ) => {
    const { payload, nota } = event
    const errors = {}

    const user = await api.post('/register', payload)
    .then(res => res)
    .catch(err => errors.message = err.response.data)

    if(Object.entries(errors).length === 1){
        throw new Error(JSON.stringify(user))
    }

    const contenet = await api.post(`/add/${payload.nss}`, nota )
    .then(res => res)
    .catch(err => errors.message = err.response.data)

    return{
        ...user,
        ...contenet
    }
}

const loadPacientes = async() => {
    
    const resp = await api.get()
        .then(res => res.data.message)
    
    return resp
}

const searchByText = async( context, event ) => {
    const querySearch = await axios.get(`http://localhost:4000/app/search/?text=${event.query}`)
    .then(res => res.data.message)

    return querySearch

}

export const usePacienteMachine = Machine({
    id: 'pacientes_Machine',
    initial: 'idle',
    context: {
        error: {},
        response: {},
        pacientes: {},
        error_pacientes: {},
        search: {}
    },
    states: {
        idle: {},
        form:{
            invoke:{
                id: 'user_data',
                src: usersData,
                onDone: {
                    target: "success",
                    actions: assign({
                        response: ( _, event ) => event.data
                    })
                },
                onError: {
                    target: "fail",
                    actions: assign({
                        error: ( _, event ) => event.data
                    })
                }

            }
        },
        sendNota: {
            invoke:{
                id: 'notaAndNewUser',
                src: notaAndNewUser,
                onDone: {
                    target: "success",
                    actions: assign({
                        response: (_, event) => event.data
                    })
                },
                onError: {
                    target: 'fail',
                    actions: assign({
                        error: (_, event) => event.data
                    })
                }
            }
        },
        load_pacientes: {
            invoke: {
                id: 'loadPacientes',
                src: loadPacientes,
                onDone:{
                    target: 'loaded_pacientes',
                    actions: assign({
                        pacientes: (_, event) => event.data
                    })
                },
                onError:{
                    target: 'error_pacientes',
                    actions: assign({
                        load_error: (_, event) => event.data
                    })
                }
            }
        },
        success: {},
        fail: {},
        // states handled load pacientes data
        loaded_pacientes: {},
        error_pacientes: {},
        search: {
            invoke: {
                id: 'seach_text_query',
                src: searchByText,
                onDone: {
                    target: 'searchDone',
                    actions: assign({
                        search: (context, event) => event.data
                    })
                }
            }
        },
        searchDone: {}

    },
    on: {
        USER_DATA: 'form',
        NOTA: 'sendNota',
        LOAD: 'load_pacientes',
        SEARCH: 'search'
    }
    
})