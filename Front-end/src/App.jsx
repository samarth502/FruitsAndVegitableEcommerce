import { useState } from "react";
import "./App.css";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import SingUp from "./Components/SingUp";
import LoginPage from "./Page/LoginPage";
import SignUp from "./Components/SingUp";
import HomePage from "./Page/HomePage";
import ProductsDetails from "./Components/ProductsDetails";
import toast, { Toaster } from "react-hot-toast";
import UserProfile from "./Components/UserProfi";
import { TokenProvider } from "./Strore/Auth";
import CartPage from "./Page/CartPage";
import SingupPage from "./Page/SingupPage";

function App() {
  const [cart, setCart] = useState([]);


  const clearCart = () => {
    setCart([]);
    toast.success("Cart Cleared!!!");
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <SingupPage />
        </>
      ),
    },
    {
      path: "/login",
      element: <LoginPage />,
    },

    {
      path: "/home",
      element: <HomePage cart={cart} setCart={setCart} />,
    },

    {
      path: "/productDetails/:id",
      element: <ProductsDetails cart={cart} setCart={setCart} />,
    },

    {
      path: "/cart",
      element: <CartPage cart={cart} setCart={setCart} clearCart={clearCart} />,
    },

    {
      path: "/user",
      element: <UserProfile />,
    },
  ]);

  return (
    <>
      <TokenProvider cart={cart} setCart={setCart}>
        <div className="App">
          <Toaster position="top-right" reverseOrder={false} />

          <RouterProvider router={router} />
        </div>
      </TokenProvider>
    </>
  );
}

export default App;
