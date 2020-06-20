import React from 'react'
import { connect } from 'react-redux'
import { auth } from '../../store/actions/auth'
import { Button, Input } from '../../components/UI'
import classes from './style.module.css'

function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(String(email).toLowerCase())
}


class Auth extends React.Component {

	state = {
		isFormValid: false,
		formControls: {
			email: {
				value: '',
				type: 'email',
				label: 'Email',
				errorMessage: 'Введите корректный email',
				valid: false,
				touched: false,
				validation: {
					required: true,
					email: true
				}
			},
			password: {
				value: '',
				type: 'password',
				label: 'Пароль',
				errorMessage: 'Введите корректный пароль',
				valid:false,
				touched: false,
				validation: {
					required: true,
					minLength: 6
				}
			}
		}
	}
	
	loginHandler = () => {
		const { formControls } = this.state

		this.props.auth(
			formControls.email.value,
			formControls.password.value,
			true
		)

		// try {
		// 	const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAt081-MWjr6F0HEUsjtfUlJVubi5EJNhc', authData)
		// 	console.log('res.data: ', res.data)
		// } catch(error) {
		// 	console.log(error)
		// }
		
	}

	registerHandler = () => {
		const { formControls } = this.state

		this.props.auth(
			formControls.email.value,
			formControls.password.value,
			false
		)

	}

	submitHandler = (event) => {
		event.preventDefault()
	}

	validateControl(value, validation) {
		if (!validation) return true
		
		let isValid = true
		
		if (validation.required) {
			isValid = value.trim() !== '' && isValid
		}

		if (validation.email) {
			isValid = validateEmail(value) && isValid
		}

		if (validation.minLength) {
			isValid = value.length >= validation.minLength && isValid
		}

		return isValid

	}

	onChangeHandler = (e, controlName) => {
		const formControls = { ...this.state.formControls }
		const control = { ...formControls[controlName] }
		
		control.value = e.target.value
		control.touched = true
		control.valid = this.validateControl(control.value, control.validation)

		formControls[controlName] = control

		let isFormValid = true

		Object.keys(formControls).forEach(name => {
			isFormValid = formControls[name].valid && isFormValid
		})

		this.setState({ formControls, isFormValid })
	}

	renderInputs() {
		return Object.keys(this.state.formControls).map((controlName, index) => {
			const { label, type, touched, validation, value, valid, errorMessage } = this.state.formControls[controlName]
			return (
				<Input
					key={ controlName + index }
					type={ type }
					value={ value }
					valid={ valid }
					touched={ touched }
					label={ label }
					shouldValidate={ !!validation }
					errorMessage={ errorMessage }
					onChange={ e => this.onChangeHandler(e, controlName) }
				/>
			)
		})
	}
	render() {
		console.log('localStorage', localStorage)
		return (
			<div className={ classes.Auth }>
				<div>
					<h1>Авторизация</h1>
					<form
						className={ classes.AuthForm }
						onSubmit={ this.submitHandler }
					>
						{ this.renderInputs() }
						<Button
							type="success"
							onClick={ this.loginHandler }
							disabled={ !this.state.isFormValid }
						>
							Войти
						</Button>
						<Button
							type="primary"
							onClick={ this.registerHandler }
							disabled={ !this.state.isFormValid }
						>
							Зарегистрироваться
						</Button>
					</form>
				</div>
			</div>
		)
	}
}


// function mapStateToProps(state) {
// 	return {

// 	}
// }

function mapDispatchToProps(dispatch) {
	return {
		auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
	}
}

export default connect(
	null,
	mapDispatchToProps
)(Auth)