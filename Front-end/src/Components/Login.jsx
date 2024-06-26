import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useToken } from "../Strore/Auth";
import AuthService from "../Services/AuthService";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const { token, setToken, clearToken } = useToken();

  const navigate = useNavigate();



  // const onSubmit = async (data) => {
  //   try {
  //     const response = await fetch('http://localhost:8080/auth/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(data)
  //     });
      
  //     const result = await response.json();
  //     console.log();
      
  //     if (response.ok) {
  //       const { token } = result;
  //       console.log("my token......",token);
  //       setToken(token);
  //       setIsLoggedIn(true);
  //       navigate('/home')
  //     } else {
  //       // setError("apiError", { message: result.msg });
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };


  const onSubmit = async (data) => {
    try {
      const response = await AuthService.login(data);
      const { token } = response;
      setToken(token);
      setIsLoggedIn(true);
      navigate('/home');
    } catch (error) {
      setError(error.message);

    }
  };

  return (
    <>
      {isLoggedIn && <Navigate to="/home" replace={true} />}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", { required: 'Email is required' })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              {error && (
                  <p className="text-red-500">{error}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", { required: 'Password is required' })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>
            </div>

            {errors.apiError && <p className="text-red-500">{errors.apiError.message}</p>}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member? <Link to="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign up</Link>
          </p>
        </div>
      </div>
    </>
  );
}
