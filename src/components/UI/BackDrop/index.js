import React from 'react'
import classes from './style.module.css'

const BackDrop = props => <div className={classes.BackDrop} onClick={props.onClick} />

export default BackDrop