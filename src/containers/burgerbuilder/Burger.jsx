/** @format */

import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import { connect} from 'react-redux'
import Burgeer from '../../components/burger/Burgeer';
import BuildControls from '../../components/burger/buildControls/BuildControls';
import Modal from '../../components/UserInterface/Modal/Modal';
import OrderSummary from '../../components/burger/orderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UserInterface/spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/index'



export class Burger extends Component {
	state = {
		purchasing: false
	};

	componentDidMount() {
		this.props.onInitIngredients()
		
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return  sum > 0 
	}

	

	purchaseHandler = () => {
		if(this.props.isAuthenticated) {
			this.setState({ purchasing: true });
		} else {
			this.props.onSetAuthRedirectPath('/checkout')
			this.props.history.push('/auth')
		}
		
	};

	purchaseCancelHandler = () => {

		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
			this.props.onInitPurchase();
			this.props.history.push('/checkout')
	};

	render() {
		const disabledInfo = {
			...this.props.ings,
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;

		let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

		if (this.props.ings) {
			burger = (
				<Aux>
					<Burgeer ingredients={this.props.ings} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						purchasable={this.updatePurchaseState(this.props.ings)}
						ordered={this.purchaseHandler}
						isAuth={this.props.isAuthenticated}
						price={this.props.prc}
					/>
				</Aux>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					price={this.props.prc}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
				/>
			);
    }


		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}


const mapStateToProps = state => {
    return {
			ings: state.burgerBuilder.ingredients,
			prc: state.burgerBuilder.totalPrice,
			error: state.burgerBuilder.error,
			isAuthenticated: state.auth.token !== null
		}
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Burger, axios));
