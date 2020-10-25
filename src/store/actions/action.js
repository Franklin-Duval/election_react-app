
import { CREATE_USER } from './actionTypes'

export const createUser = (user) => ({
    type: CREATE_USER,
    data: {
        id: user.id,
        matricule: user.matricule,
        name: "Franklin",
        email: user.name
    }
    
})