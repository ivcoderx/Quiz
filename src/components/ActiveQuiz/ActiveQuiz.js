import React from 'react'
import classes from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = ({
	state,
	answers,
	answerNumber,
	onAnswerClick,
	quizLength,question }) => (
	<div className = { classes.ActiveQuiz }>
		<p className = { classes.Question }>
			<span>
				<strong>{ answerNumber }.</strong>&nbsp;
				{ question }
			</span>
			<small>{ answerNumber } из { quizLength }</small>
		</p>
		<AnswersList
			state={ state }
			answers={ answers }
			onAnswerClick={ onAnswerClick }
		/>
	</div>
)

export default ActiveQuiz