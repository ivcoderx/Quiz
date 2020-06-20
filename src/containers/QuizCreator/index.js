import React from 'react'
import { connect } from 'react-redux'
import { Button, Input, Select } from '../../components/UI'
import { createControl, validate, validateForm } from '../../form'
import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/create'
import classes from './style.module.css'

function createOptionControl(number) {
	return createControl({
		id: number,
		label: `Вариант ${ number }`,
			errorMessage: 'Значение не может быть пустым'
		}, { required: true }
	)
}

function createFormControl() {
	return {
		question: createControl({
			label: 'Введите вопрос',
			errorMessage: 'Вопрос не может быть пустым'
		}, { required: true }),
		options1: createOptionControl(1),
		options2: createOptionControl(2),
		options3: createOptionControl(3),
		options4: createOptionControl(4),
	}
}

class QuizCreator extends React.Component {

	state = {
		rightAnswerId: 1,
		formControls: createFormControl(),
		isFormValid: false
	}

	renderControls() {
		return Object.keys(this.state.formControls).map((controlName, index) => {
			const {
				label,
				value,
				valid,
				validation,
				touched,
				errorMessage
			} = this.state.formControls[controlName]

			return (
				<React.Fragment key={ index }>
					<Input
						label={ label }
						value={ value }
						valid={ valid }
						shouldValidate={ validation }
						touched={ touched }
						errorMessage={ errorMessage }
						onChange={ e => this.changeHandler(e.target.value, controlName) }
					/>
				{ index === 0 && <hr /> }
				</React.Fragment>
			)
		})

	}

	addQuestionHandler = (event) => {
		event.preventDefault()

		const { question, options1, options2, options3, options4 } = this.state.formControls
		const questionItem = {
			id: this.props.quiz.length + 1,
			question: question.value,
			rightAnswerId: this.state.rightAnswerId,
			answers: [
				{ text: options1.value, id: options1.id },
				{ text: options2.value, id: options2.id },
				{ text: options3.value, id: options3.id },
				{ text: options4.value, id: options4.id },
			]
		}
		this.props.createQuizQuestion(questionItem)

		this.setState({
			rightAnswerId: 1,
			formControls: createFormControl(),
			isFormValid: false
		})
	}

	createQuizHandler = event => {
		event.preventDefault()
		
		this.setState({
			rightAnswerId: 1,
			formControls: createFormControl(),
			isFormValid: false
		})
		
		this.props.finishCreateQuiz()
	}

	changeHandler = (value, controlName) => {
		const formControls = { ...this.state.formControls }
		const control = { ...formControls[controlName] }
		
		control.value = value
		control.touched = true
		control.valid = validate(control.value, control.validation)

		formControls[controlName] = control

		this.setState({
			formControls,
			isFormValid: validateForm(formControls)
		})
	}

	selectChangeHandler = event => {
		this.setState({
			rightAnswerId: +event.target.value
		})
	}

	// submitHandler = e => {

	// }

	render() {
		const { state, props } = this

		const select = (
			<Select
				label="Ваш ответ"
				value={ state.rightAnswerId}
				onChange={ this.selectChangeHandler }
				options={ [
					{ text: "1", value: "1" },
					{ text: "2", value: "2" },
					{ text: "3", value: "3" },
					{ text: "4", value: "4" },
				]}
			/>
		)
		return (
			<div className={ classes.QuizCreator }>
				<div>
					<h1>Создание теста</h1>
					<form onSubmit={ this.submitHandler }>
						{ this.renderControls() }
						{ select }
						<Button
							type="primary"
							onClick={ this.addQuestionHandler }
							disabled={ !state.isFormValid }
						>
							Добавить вопрос
						</Button>
						<Button
							type="success"
							onClick={ this.createQuizHandler }
							disabled={ props.quiz.length === 0 }
						>
							Создать тест
						</Button>
					</form>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {

	return {
		quiz: state.create.quiz
	}
}

function mapDispatchToProps(dispatch) {
	return {
		createQuizQuestion: item => dispatch(createQuizQuestion(item)),
		finishCreateQuiz: () => dispatch(finishCreateQuiz())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(QuizCreator)