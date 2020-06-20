import React from 'react'
import { Link } from 'react-router-dom'
import classes from './FinishedQuiz.module.css'
import { Button } from  '../UI'

const FinishedQuiz = ({ quiz, results, onRetry }) => {
	const successCount = Object.keys(results).reduce((total, key) => {
		if (results[key] === 'success') {
			total++
		}
		return total
	}, 0)

	return (
		<div className={ classes.FinishedQuiz }>
			<ul>
				{ quiz.map(item => {
					const cls = [
						'fa',
						results[item.id] === 'error' ? 'fa-times' : 'fa-check',
						classes[results[item.id]]

					]
					return (
						<li
							key={ item.id}
						>
							<strong>{ item.id }.</strong>&nbsp;
							{ item.question }
						 	<i className={ cls.join(' ') } />
						</li>
					)})
				}
			</ul>
			<p>Правильно { successCount } из { quiz.length }</p>
			<div>
			<Button
					 onClick={ onRetry }
					 type='primary'
				>
					Повторить
				</Button>
				<Link to='/'>
					<Button
						type='success'
					>
						Перейти в список тестов
					</Button>
				</Link>
			</div>
		</div>
	)
}

export default FinishedQuiz