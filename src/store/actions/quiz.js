import axios from '../../axios/quiz'
import {
	FETCH_QUIZES_START,
	FETCH_QUIZES_SUCCESS,
	FETCH_QUIZES_ERROR,
	FETCH_QUIZ_SUCCESS,
	QUIZ_SET_STATE,
	QUIZ_FINISH,
	QUIZ_NEXT_QUESTION,
	QUIZ_RETURN
} from './types'

export function fetchQuizesStart() {
	return {
		type: FETCH_QUIZES_START
	}
}

export function fetchQuizesError(error) {
	return {
		type: FETCH_QUIZES_ERROR,
		error
	}
}

export function fetchQuizes() {
	return async dispatch => {
		dispatch(fetchQuizesStart())
		try {
			const res = await axios.get('quizes.json')
			const quizes = []
			
			Object.keys(res.data).forEach((key, index) => {
				quizes.push({
					id: key,
					name: `Тест №${ index + 1 }`
				})	
			})	
			
			dispatch(fetchQuizesSuccess(quizes))
			
		} catch(error) {
			dispatch(fetchQuizesError(error))
		}	
	}	
}	


export function fetchQuizById(quizId) {
	return async dispatch => {
		dispatch(fetchQuizesStart())
		try {
			const res = await axios.get(`quizes/${ quizId }.json`)
			const quiz = res.data

			dispatch(fetchQuizSuccess(quiz))

		} catch(error) {
			dispatch(fetchQuizesError(error))
		}
	}
}

export function fetchQuizesSuccess(quizes) {
	return {
		type: FETCH_QUIZES_SUCCESS,
		quizes
	}
}

export function fetchQuizSuccess(quiz) {
	return {
		type: FETCH_QUIZ_SUCCESS,
		quiz
	}
}

export function quizSetState(answerState, results) {
	return {
		type: QUIZ_SET_STATE,
		answerState,
		results
	}
}
export function quizNextQuestion(number) {
	return {
		type: QUIZ_NEXT_QUESTION,
		number
	}
}

export function finishQuiz() {
	return {
		type: QUIZ_FINISH
	}
}

export function retryQuiz () {
	return {
		type: QUIZ_RETURN
	}
}

export function quizAnswerClick(answerId) {
	return (dispatch, getState) => {

		const state = getState().quiz

		if (state.answerState) {
			const key = Object.keys(state.answerState)[0]
			if(state.answerState[key] === 'success') return
		}

		const question = state.quiz[state.activeQuestion]
		const { results } = state

		if(question.rightAnswerId === answerId) {
			if(!results[question.id]) {
				results[question.id] = 'success'
			}
			dispatch(quizSetState(
				{ [answerId]: 'success' },
				results)
			)
			const timeout = window.setTimeout(() => {
				if (isQuizFinished(state)) {
					dispatch(finishQuiz())
				} else {
					dispatch(quizNextQuestion(state.activeQuestion + 1))
				
					// this.setState({
					// 	activeQuestion: state.activeQuestion + 1,
					// 	answerState: null
					// })
				}
				window.clearTimeout(timeout)
			}, 1000)

		} else {
			results[question.id] = 'error'

			dispatch(quizSetState(
				{ [answerId]: 'error' },
				results)
			)
		}
	}
}

function isQuizFinished (state) {
	return (state.activeQuestion + 1) === state.quiz.length
}
