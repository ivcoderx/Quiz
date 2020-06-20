import React from 'react'
import classes from './style.module.css'

function isInvalid(valid, touched, shouldValidate) {
	return !valid && touched && shouldValidate
}

const Input = ({ type, label, value, onChange, errorMessage, valid, touched, shouldValidate }) => {

	const inputType = type || 'text'
	const cls = [classes.Input]
	const htmlFor = `${ inputType }=${ Math.random() }`

	if (isInvalid(valid, touched, shouldValidate)) {
		cls.push(classes.invalid)
	}

	return (
		<div className={ cls.join(' ') }>
			<label htmlFor={ htmlFor }>
				{ label }
			</label>
			<input
				type={ inputType }
				id={ htmlFor }
				value={ value }
				onChange={ onChange }
			/>
			{ isInvalid(valid, touched, shouldValidate) &&
				<span className={ classes.error }>
					{ errorMessage || "Введите верное значение" }
				</span>
			}
		</div>
	)
}

export default Input