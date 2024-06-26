import React, { useEffect } from 'react';
import { useToken } from '../Strore/Auth';
useToken
const UserProfile = () => {
  const { users, product, loading } = useToken();
  console.log("yaa dtaatfa",users);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (!users) {
    return <div>No user data found.</div>;
  }

  return (
    <>
      <div className="md:grid grid-cols-4 grid-rows-2 bg-white gap-2 p-4 rounded-xl">
        <div className="md:col-span-1 h-48 shadow-xl">
          <div className="flex w-full h-full relative">
            <img
              src="https://res.cloudinary.com/dboafhu31/image/upload/v1625318266/imagen_2021-07-03_091743_vtbkf8.png"
              className="w-44 h-44 m-auto"
              alt="Profile"
            />
          </div>
        </div>
        <div className="md:col-span-3 h-48 shadow-xl p-4 space-y-2">
          <div className="flex">
            <span className="text-sm bg-blue-50 font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">
              Name:
            </span>
            <input
              className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
              type="text"
              defaultValue={users.name}
              readOnly
            />
          </div>
          <div className="flex">
            <span className="text-sm bg-blue-50 font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">
              Email:
            </span>
            <input
              className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
              type="text"
              defaultValue={users.email}
              readOnly
            />
          </div>
         
        </div>
        
      </div>
    </>
  );
}

export default UserProfile;
