import React from 'react';

export default function VendorCard({ image, name, details }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex flex-col items-center">
        {/* Vendor Image */}
        <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
          <img src={image} alt={`${name} Logo`} className="rounded-full" />
        </div>
        {/* Vendor Name */}
        <h2 className="text-xl font-semibold">{name}</h2>
      </div>
      <hr className="my-4" />
      {/* Vendor Details */}
      <ul className="text-sm space-y-2">
        {Object.entries(details).map(([key, value], index) => (
          <li key={index}>
            <strong>{key}: </strong>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
