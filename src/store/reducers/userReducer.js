
import { CREATE_USER } from '../actions/actionTypes'

const initialStore = {
    user: {
        id: 0,
        matricule: "",
        name: "",
        email: ""
    }
}

const userReducer = (state=initialStore, action) => {
    switch(action.type){
        case CREATE_USER:
            let test= {
                ...state,
                user: {
                    id: action.data.id,
                    matricule: action.data.matricule,
                    name: action.data.name,
                    email: action.data.email
                }
            }
            console.log("test", test)
            return test
        default:
            return state
    }
}

export default userReducer