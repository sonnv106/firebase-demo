import * as api from '../api'

export const autoSignIn = ()=>{
    return({
        type: 'AUTO_SIGNIN',
        payload: api.autoSignIn()
    })
}
export const logoutUser = ()=>{
    return({
        type: 'LOGOUT_USER',
        payload: api.logoutUser()
    })
}
export const loginUser = (email: string, password: string)=>{
    return({
        type: 'LOGIN_USER',
        payload: api.loginUser(email, password)
    })
}
