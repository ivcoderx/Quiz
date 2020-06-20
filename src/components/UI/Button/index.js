import React from 'react'
import classes from './style.module.css'

const Button = ({ onClick, children, disabled, type}) => {
	const cls = [
		classes.Button,
		classes[type]
	]

	return (
		<button
			onClick={ onClick }
			className={ cls.join(' ') }
			disabled={ disabled }
		>
			{ children }
		</button>
	)
}

export default Button