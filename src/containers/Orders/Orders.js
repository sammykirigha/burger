/** @format */

import React, { Component } from 'react';
import Order from '../../components/order/Order';
import axios from '../../axios-order';
import {connect} from 'react-redux'
import WithErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UserInterface/spinner/Spinner'

class Orders extends Component {
	componentDidMount() {
		this.props.onFetchOrders();
	}

	render() { 
		let orders = <Spinner />;
		if(!this.props.loading) {
			orders = this.props.orders.map((order) => (
				<Order
					key={order.id}
					ingredients={order.ingredients}
					price={order.price}
				/>
			));
		}
		return (
			<div>
				{orders}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading
	}
}


const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: () => dispatch(actions.fetchOrders())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios));
