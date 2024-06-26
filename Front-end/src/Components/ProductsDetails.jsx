import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MixData from '../../MixData';
import { Link } from 'react-router-dom';
import logo from "../assets/fruits.png";
import { FaUserAlt } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { useToken } from '../Strore/Auth';
import toast, { Toaster } from 'react-hot-toast';



const ProductsDetails = ({cart,setCart}) => {
  const { id } = useParams();
  const [products, setProduct] = useState(null);

  const {product} = useToken();

  const addToCart =(id,
    name,
    price,
    desc,
    img,
    rating)=>{

    const obj = {
      id,
      name,
      price,
      desc,
      img,
      rating,
    };
    setCart([...cart,obj]);

    toast.success("Item Added !");



  }


  useEffect(() => {
    const filterProduct = MixData.find((item) => item.id === parseInt(id));
    setProduct(filterProduct);
    console.log(filterProduct);
  }, [id]);

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
<>    

<Toaster position="top-right" reverseOrder={false} />


<div className="fixed top-0 h-24 shadow-md w-full  px-2 md:px-4 z-50 bg-white">


      <div className="flex items-center h-full justify-between px-16">
        <Link to={""}>
          <div className="h-[90px] w-[100px]">
            <img src={logo} className="h-full w-full" />
          </div>
        </Link>

      
          <div className="text-2xl flex justify-between items-center gap-16 text-slate-600 relative">
            <Link to='/user'>
            <FaUserAlt size={40}/>
            </Link>
            <Link to='/cart'>
              <BsCartFill size={40} />
              {cart.length >0 && (
                <div className="absolute -top-1 -right-1 text-white bg-red-500 h-5 w-5 rounded-full m-0 p-0 text-sm text-center font-extrabold ">
                {cart.length }
               </div>

              )}
              
            </Link>
          </div>
          
      </div>

    </div>

    <div className="py-6 flex justify-center items-center h-[500px] w-full mt-48 max-md:w-full max-md:h-[400px] max-sm:h-[500px] ">
      

      <div className="flex w-[70%] justify-center items-center max-md:gap-6 h-full shadow-lg rounded-lg overflow-hidden">
        
        <div className="w-[60%]  max-md:w-[50%] max-sm:w-[50%]">
          <img src={products.img} alt={products.name} className="object-cover w-auto h-[340px] max-sm:h-[200px]   " />
        </div>
        <div className="w-2/3 p-4 mt-16">
          <h1 className="text-gray-900 font-bold text-4xl max-md:text-2xl ">{products.name}</h1>
          <p className='text-gray-900 font-bold text-[15px] max-md:text-sm mt-5 max-sm:text-[15px] '>{products.desc}</p>
          <p className="mt-2 text-gray-600 text-2xl">{products.description}</p>
          <div className="flex items-center mt-8">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-5 h-5 fill-current ${index < products.rating ? 'text-gray-700' : 'text-gray-500'}`}
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
              </svg>
            ))}
          </div>
          <div className="flex items-center justify-between mt-3">
            <h1 className="text-gray-700 font-bold text-xl">${products.price}</h1>
            <button className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded" onClick={()=>addToCart(
                  products.id,
                  products.name,
                  products.price,
                  products.desc,
                  products.img,
                  products.rating
                )}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
    </>

  );
}

export default ProductsDetails;
