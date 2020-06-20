import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Loader } from '../../components/UI'
import classes from './style.module.css'
import { fetchQuizes } from '../../store/actions/quiz'

class QuizList extends React.Component {

	componentDidMount() {
		this.props.fetchQuizes()
	}

	renderQuizes() {
		return this.props.quizes.map((quiz, index) => {
			return (
				<li key={ quiz.id }>
					<NavLink to={ `/quiz/${ quiz.id }`}>
						{ quiz.name }
					</NavLink>
				</li>
			)
		})
	}
	
	render() {
		return (
			<div className={ classes.QuizList }>
				<div>
					<h1>Список тестов</h1>
					{ this.props.loading && !!this.props.quizes.length
						? <Loader />
						: (
							<ul>
								{ this.renderQuizes() }
							</ul>
						)
					}					
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		quizes: state.quiz.quizes,
		loading: state.quiz.loading
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchQuizes: () => dispatch(fetchQuizes())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(QuizList)
