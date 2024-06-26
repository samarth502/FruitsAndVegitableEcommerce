import React from 'react'
import Cart from '../Components/Cart'

const CartPage = ({cart, setCart, clearCart}) => {
  return (
   <>
     <Cart cart={cart} setCart={setCart} clearCart={clearCart} ></Cart>
   </>
  )
}

export default CartPage