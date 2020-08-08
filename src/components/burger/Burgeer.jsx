import React from 'react';
import {withRouter} from 'react-router-dom'
import BurgerIngredient from './burgerIngredients/BurgerIngredient';
import styles from './Burger.module.css';

const Burgeer = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
  .map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey} />
    });
  }).reduce((arr, el) => {
    return arr.concat(el)
  }, []);

  if(transformedIngredients.length === 0) {
     transformedIngredients = <p>Please start adding ingredients!!..</p>
  }

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type = "bread-top" />
      {transformedIngredients}
      <BurgerIngredient type = "bread-bottom" />
    </div>
  )
}

export default withRouter(Burgeer)
