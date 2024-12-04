import React from 'react';

export default function VendorOrCustomer(){
    return(
        <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Select Your Role</h1>
          <div className="flex gap-4">
            <button className="bg-customBlue hover:bg-customRed text-white px-6 py-3 rounded-lg">
              Customer
            </button>
            <button className="bg-customBlue hover:bg-customRed text-white px-6 py-3 rounded-lg">
              Vendor
            </button>
          </div>
        </div>
      </div>
    )
}