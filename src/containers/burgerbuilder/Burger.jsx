import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burgeer from '../../components/burger/Burgeer'
import BuildControls from '../../components/burger/buildControls/BuildControls'
import Modal from '../../components/UserInterface/Modal/Modal';
import OrderSummary from '../../components/burger/orderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UserInterface/spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';


const INGREDEINT_PRICES = {
  salad: 50,
  cheese: 50,
  meat: 130,
  bacon: 70
}

class Burger extends Component {

  state ={
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 400,
    purchasable: false,
    purchasing: false,
    loading: false
  }

  updatePurchaseState (ingredients) {

    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    }) 
    .reduce((sum, el) => {
      return sum + el
    }, 0);
    this.setState({purchasable: sum > 0})
  }




  addIngredientHandler = (type) => {
     const oldCount = this.state.ingredients[type];
     const updatedCount = oldCount + 1;
     const updatedIngredients = {
       ...this.state.ingredients
     };
     updatedIngredients[type] = updatedCount;
     const priceAddition = INGREDEINT_PRICES[type];
     const oldPrice = this.state.totalPrice;
     const newPrice = oldPrice + priceAddition;
     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
     this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0) {
      return;
    } 

    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDEINT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    //alert('You continue!...');
    this.setState({ loading: true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Max Schwarzmuller',
        address: {
          street: 'Teststreet 1',
          zipCode: '41351',
          country: 'Germany'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
    .then(response => {
       this.setState({ loading: false, purchasing: false});
    })
    .catch(error => {
      this.setState({ loading: false, purchasing: false});
    });
  }
 


  render() {

    const disabledInfo = {
      ...this.state.ingredients
    };

    for(let key in disabledInfo ) {
      disabledInfo[key] = disabledInfo[key] <= 0
    };
     
    let orderSummary =  <OrderSummary 
    ingredients= {this.state.ingredients}
    price = {this.state.totalPrice}
    purchaseCancelled = {this.purchaseCancelHandler}
    purchaseContinued = {this.purchaseContinueHandler}/>

    if (this.state.loading) {
         orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}> 
          {orderSummary}
        </Modal>
        <Burgeer ingredients = {this.state.ingredients}/>
        <BuildControls 
           ingredientAdded = {this.addIngredientHandler}
           ingredientRemoved = {this.removeIngredientHandler}
           disabled = {disabledInfo}
           purchasable = {this.state.purchasable}
           ordered = {this.purchaseHandler}
           price = {this.state.totalPrice}/>
      </Aux>
    )
  }
}

export default WithErrorHandler(Burger, axios);
