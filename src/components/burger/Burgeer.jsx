import React from 'react';
import BurgerIngredient from './burgerIngredients/BurgerIngredient';
import styles from './Burger.module.css';

const Burgeer = (props) => {
  return (
    <div className={styles.Burger}>
      <BurgerIngredient type = "bread-top" />
      <BurgerIngredient type = "cheese" />
      <BurgerIngredient type = "meat" />
      <BurgerIngredient type = "bread-bottom" />
    </div>
  )
}

export default Burgeer
