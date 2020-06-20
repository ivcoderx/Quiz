import React from 'react'
import { connect } from 'react-redux'
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/actions/quiz'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import { Loader } from '../../components/UI'
import classes from './style.module.css'


class Quiz extends React.Component {

	componentDidMount() {
		this.props.fetchQuizById(this.props.match.params.id)
	}

	componentWillUnmount() {
		this.props.retryQuiz()
	}

	render() {
		const { quiz, activeQuestion, answerState, isFinished, results, loading } = this.props

		return [
			<div className={ classes.Quiz} key="001">
				<div className={ classes.QuizWrapper}>
					<h1>Ответьте на все вопросы</h1>
					{ loading
						? <Loader />
						: isFinished
							? <FinishedQuiz
									results={ results }
									quiz={ quiz }
									onRetry={ this.props.retryQuiz }
								/>
							: <ActiveQuiz
									answers={ quiz[activeQuestion].answers}
									question={ quiz[activeQuestion].question}
									onAnswerClick={ this.props.quizAnswerClick }
									quizLength={ quiz.length }
									answerNumber={ activeQuestion + 1 }
									state={ answerState }
								/>
					}
				</div>
			</div>
		]
	}
}

function mapStateToProps(state) {

	const { results, isFinished, activeQuestion, answerState, quiz, loading } = state.quiz

	return {
		results: results,
		isFinished: isFinished,
		activeQuestion: activeQuestion,
		answerState: answerState,
		quiz: quiz,
		loading: loading
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchQuizById: id => dispatch(fetchQuizById(id)),
		quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
		retryQuiz: () => dispatch(retryQuiz())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Quiz)