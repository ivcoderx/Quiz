import React from 'react'
import classes from './style.module.css'

const Loader = props => (
	<div className={  classes.Loader_wrapper}>
		<div className={ classes.Loader }>
			<div />
			<div />
			<div />
			<div />
		</div>
	</div>
)

export default Loader