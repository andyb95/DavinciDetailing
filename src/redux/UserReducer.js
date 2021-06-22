const initialState = {
    userId: '',
    email: '',
    isAdmin: '',
    isLoggedIn: false
}

const LOGIN= 'LOGIN'
const LOGOUT = 'LOGOUT'
const UPDATE_EMAIL = 'UPDATE_USER'

export function loginUser(user) {
    return {
        type: LOGIN,
        payload: user
    }
} 

export function logout() {
    return {
        type: LOGOUT
    }
}

export function updateEmail(email) {
    return {
        type: UPDATE_EMAIL,
        payload: email
    }
}

export default function(state = initialState, action) {
    let {type, payload} = action
    switch(type) {
        case LOGIN:
            return {...state,
                userId: payload.userId,
                email: payload.email,
                isAdmin: payload.isAdmin,
                isLoggedIn: true
            }
        case LOGOUT: 
            return initialState
        case UPDATE_EMAIL:
            return {...state, email: payload}
        default: 
            return state
    }
}