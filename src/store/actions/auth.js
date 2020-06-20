import axios from '../../axios/quiz'
import {
	AUTH_SUCCESS,
	AUTH_LOGOUT
} from './types'

function authSuccess(token) {
	return {
		type: AUTH_SUCCESS,
		token
	}
}

function logout() {
	localStorage.removeItem('token')
	localStorage.removeItem('usetId')
	localStorage.removeItem('expirationDate')

	return {
		type: AUTH_LOGOUT
	}
}

function authLogout(time) {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout())
		}, time * 1000)
	}
}

export function auth(email, password, isLogin) {
	return async (dispatch, getState) => {
		const authData = {
			email,
			password,
			returnSecureToken: true
		}

		const url = isLogin
			? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAt081-MWjr6F0HEUsjtfUlJVubi5EJNhc'
			: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAt081-MWjr6F0HEUsjtfUlJVubi5EJNhc'
			
		const { data } = await axios.post(url, authData)
		const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

		localStorage.setItem('token', data.idToken)
		localStorage.setItem('usetId', data.usetId)
		localStorage.setItem('expirationDate', expirationDate)

		dispatch(authSuccess(data.idToken))
		dispatch(authLogout(data.expiresIn))
		console.log('res.data: ', data)
	}
}
