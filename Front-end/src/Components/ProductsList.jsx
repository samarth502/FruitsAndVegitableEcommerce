import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useToken } from "../Strore/Auth";

const ProductsList = ({
  id,
  name,
  price,
  desc,
  img,
  rating,
  cart,
  setCart,
}) => {
  const { product } = useToken();
  // const {addToCart} = useToken();

  // console.log("my products",product );

  const addToCart = (id, name, price, desc, img, rating) => {
    const obj = {
      id,
      name,
      price,
      desc,
      img,
      rating,
    };

    setCart([...cart, obj]);
    console.log(cart);

    toast.success("Item Added !");

  //   console.log("add to ", cart);
  };

  // const productsArray = Array.isArray(product) ? product : [];

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {product?.map((item) => (
        <div className="font-bold w-[250px] bg-white p-5 flex flex-col rounded-lg gap-2 max-sm:w-full max-sm:h-full">
          <Link to={`/productDetails/${item.id}`}>
            <img
              src={item.img}
              alt=""
              className="w-auto max-sm:w-full max-sm:h-full  h-[130px] hover:scale-110 cursor-grab transition-all duration-500 ease-in-out"
            />
        </Link>

          <div className="text-sm flex justify-between">
            <h2>{item.name}</h2>
            <span className="text-green-500 ">₹{item.price}</span>
          </div>
          <p className="text-sm font-normal">{item.desc.slice(0, 30)}...</p>
          <div className="flex justify-between">
            <span className="flex justify-center items-center">
              <AiFillStar className="mr-1 text-yellow-400" /> {item.rating}
              
            </span>
            <button
              onClick={() =>
                addToCart(
                  item.id,
                  item.name,
                  item.price,
                  item.desc,
                  item.img,
                  item.rating
                )
                
              }
              className="p-1 text-white bg-green-500 hover:bg-green-600 rounded-lg text-sm"
            >
              Add to cart
            </button>
          </div>
        </div>

      ))}
    </>
  );
};

export default ProductsList;
