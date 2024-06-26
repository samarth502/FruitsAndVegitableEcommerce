import { Fragment, useState } from "react"
import { Button, Dialog, Transition } from "@headlessui/react"
import { Link, Navigate } from "react-router-dom"
import { useToken } from "../Strore/Auth";
import HomePage from "../Page/HomePage";



export default function Cart({cart,setCart,clearCart}) {
  const [open, setOpen] = useState(true)
  const [openModal,setOpenModal] = useState(false);

  const {removeFromCart} = useToken();



  const fetchCartItems = async () => {
    if (!token) return; // Ensure token is available
    const data = await CartService.getCartItems(token);
    if (data) {
      setCartItems(data.cartItems); // Assuming the response structure has 'cartItems'
    } else {
      // Handle error fetching cart items
      console.log('Error fetching cart items');
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    if (!token) return; // Ensure token is available
    const data = await CartService.addToCart(productId, quantity, token);
    if (data) {
      // Handle success adding to cart
      console.log('Added to cart:', data);
      fetchCartItems(); // Refresh cart items after adding
    } else {
      // Handle error adding to cart
      console.log('Failed to add to cart');
    }
  };

  const handleRemoveFromCart = async (productId) => {
    if (!token) return; // Ensure token is available
    const data = await CartService.removeFromCart(productId, token);
    if (data) {
      // Handle success removing from cart
      console.log('Removed from cart:', data);
      fetchCartItems(); // Refresh cart items after removal
    } else {
      // Handle error removing from cart
      console.log('Failed to remove from cart');
    }
  };




  
  
const handleRemove = (id) =>{
  removeFromCart(id);


}

  return (
    <>
      <div className="mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 my-5">
            Cart
          </h1>
          <div className="flow-root">
         
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-36 w-36 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.img}
                    //   alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between font-extrabold text-2xl  text-gray-900">
                        <h3>
                          <a href={item.id}>{item.name}</a>
                        </h3>
                        <p className="ml-4">$ {item.price}</p>
                      </div>
                      <p className="text-2xl font-semibold mt-5">{item.desc.slice(0,30)}...</p>

                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div>
                        <label
                          htmlFor="quantity"
                          className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                        >
                          Qty
                        </label>
                        <select
                        // onChange={(e) => handleQuantity(e, item)}
                        onChange={(e)=>handleQuantity(e,item)}
                        value={item.quantity}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                      <div className="flex">
                       
                        <button
                          type="button"
                          onClick={() => handleRemove(item.id)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">

        
         

          {cart.length ?  (
            
          <button onClick={clearCart} class=" mt-12 group relative h-12 w-48 overflow-hidden rounded-2xl bg-green-500 text-lg font-bold text-white">
          Clear cart
          <div class="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
        </button>

          ):(
            <h1 className="text-center text-4xl font-extrabold w-full">No data</h1>
          )}


         
         
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <Link to='/home'>
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => setOpen(false)}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
