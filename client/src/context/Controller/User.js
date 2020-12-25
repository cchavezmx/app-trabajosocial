import axios from 'axios'
import decode from 'jwt-decode'
import { Error } from 'mongoose'

const api = axios.create({
    baseURL: 'http://localhost:4000/app/user'
})

export default {
    login: async (_, event) => {
        
        const user = await api.post('/login', event.data ).then(res => res.data.login)
        localStorage.setItem('socialToken', user.token )
        return user
    },
    auth: async() => {
        const token = localStorage.getItem('socialToken')
       try {
           if(!token) throw new Error('Token error', { message: 'No hay token guardado'})
           const authUser = await api.get(`/${decode(token).id }`, { headers: {
                Authorization: `Bearer ${token}`
           }}).then(res => res.data.message)
           return authUser
       } catch (error) {
           throw new Error('authorization fail', error )
       }
    }
}