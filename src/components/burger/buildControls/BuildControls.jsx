/** @format */

import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './buildControl/BuildControl';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Meat', type: 'meat' },
];

const BuildControls = (props) => {
	return (
		<div className={classes.BuildControls}>
			<p>
				Current Price: <strong>KES{props.price}</strong>
			</p>
			{controls.map((ctrl) => (
				<BuildControl
					key={ctrl.label}
					label={ctrl.label}
					added={() => props.ingredientAdded(ctrl.type)}
					removed={() => props.ingredientRemoved(ctrl.type)}
					disabled={props.disabled[ctrl.type]}
				/>
			))}
      <button 
      className={classes.OrderButton}
      disabled = {!props.purchasable}
			onClick = {props.ordered}>ORDER NOW</button>
		</div>
	);
};

export default BuildControls;
