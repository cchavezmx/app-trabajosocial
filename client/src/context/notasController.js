import axios from 'axios'
import { Error } from 'mongoose'

const api = axios.create({
    baseURL: 'http://localhost:4000/app'
})

// TODO: Tomar de el contexto de usuario el valor de rol para determinar si el usuario esta facultado para hacer los cambios

// TODO: NOTA, el error se pasa en un JSON.stringify para poder pasarlo en el contexto, del otro ado podemos ocuparlo con un JSON.parse

export default {
    createUser: async(_, event ) => {

        const { data } = event 
        const token = localStorage.getItem('yayitaToken')

       const res = await api.post('/notas', data, {
                headers: { authorization: `Bearer ${token}`}
            })
            .then(res => res)
            .catch(err => err.response) 
        
        if(res.status === 400){
        throw new Error(JSON.stringify(res.data.message))
        }else{
        return res.data?.nota
        }
        
    },
    createNote: () => {},
}