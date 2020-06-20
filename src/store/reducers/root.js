import { combineReducers } from 'redux' 
import authReducer from './auth'
import createReducer from './create'
import quizReducer from './quiz'

export default combineReducers({
	auth: authReducer,
	create: createReducer,
	quiz: quizReducer,
})