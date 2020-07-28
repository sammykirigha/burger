/** @format */

import React from 'react';
import Button from '../../UserInterface/button/Button';
import classes from './CheckoutSummary.module.css';
import Burgeer from '../../burger/Burgeer';

const CheckoutSummary = (props) => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1>We hope it tastes delicious!..</h1>
			<div style={{ width: '300px', margin: 'auto' }}>
				<Burgeer ingredients = {props.ingredients}  />
			</div>
			<Button btnType='Danger' clicked={props.checkoutCancelled}>CANCEL</Button>
			<Button btnType='Success' clicked ={props.checkoutContinued}>CONTINUE</Button>
		</div>
	);
};

export default CheckoutSummary;
