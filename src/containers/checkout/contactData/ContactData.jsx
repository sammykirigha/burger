/** @format */

import React, { Component } from 'react';
import {connect} from 'react-redux'
import classes from './ContactData.module.css';
import Button from '../../../components/UserInterface/button/Button';
import axios from '../../../axios-order';
import Spinner from '../../../components/UserInterface/spinner/Spinner';
import Input from '../../../components/UserInterface/input/Input';
import WithErrorHandler from '../../../hoc/withErrorHandler/WithErrorHandler';
import * as placeOrder from '../../../store/actions/index'

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name',
				},
				value: '',
				validation : {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street',
				},
				value: '',
				validation : {
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip Code',
				},
				value: '',
				validation : {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country',
				},
				value: '',
				validation : {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email',
				},
				value: '',
				validation : {
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' },
					],
				},
				value: 'fastest',
				validation: {},
				valid: true
			},
		},
		formIsValid: false
	};

	orderHandler = (event) => {
		event.preventDefault();
		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
       formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
		}
		const order = {
			ingredients: this.props.ings,
			price: this.props.prc,
			orderData: formData
		};
		this.props.onPurchaseBurgerStart(order);
	
	};     


	checkValidity(value, rules) {
		let isValid = true;

		if(rules.required) {
       isValid = value.trim() !== '' && isValid;
		}

		if(rules.minLength) {
			isValid = value.length >= rules.minLength && isValid
		}

		if(rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid
		}

		return isValid;
	}

	inputChangedHandler = (event, inputIdentifier) => {
		console.log(event.target.value)

		const updatedOrderForm = {
			...this.state.orderForm,
		};
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier],
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
		updatedFormElement.touched = true;
		updatedOrderForm[inputIdentifier] = updatedFormElement;
		
		let formIsValid = true;
		  for (let inputIdentifier in updatedOrderForm) {
				formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
			}
		this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key],
			});
		}
		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map((formElement) => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid = {!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched = {formElement.config.touched}
						changed={(event) => this.inputChangedHandler(event, formElement.id)}
					/>
				))}
				<Button btnType='Success' disabled={!this.state.formIsValid}>
					ORDER
				</Button>
			</form>
		);
		if (this.props.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact details</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		prc: state.burgerBuilder.totalPrice,
		loading: state.order.loading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onPurchaseBurgerStart: (orderData) => dispatch(placeOrder.purchaseBurger(orderData))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData, axios));
