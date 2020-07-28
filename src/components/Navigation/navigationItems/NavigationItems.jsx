import React from 'react'
import classes from './NavigationItems.module.css';
import NavigationItem from './navigationItem.jsx/NavigationItem';

const NavigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/' exact >Burger Builder</NavigationItem>
    <NavigationItem link='/orders' >Orders</NavigationItem>
  </ul>
)

export default NavigationItems
