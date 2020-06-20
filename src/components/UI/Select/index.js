import React from 'react'
import classes from './style.module.css'

const Select = ({ label, value, onChange, options }) => {
	const htmlFor = `${ label }-${ Math.random() }`
	return (
		<div className={ classes.Select }>
			<label htmlFor={ htmlFor }></label>
			<select
				id={ htmlFor }
				value={ value }
				onChange={ onChange }
			>
				{ options.map((option, index) => {
					return (
						<option
							key={ index }
							value={ option.value }
						>
							{ option.text }
						</option>
					)
				}) }
			</select>
		</div>
	)
}

export default Select