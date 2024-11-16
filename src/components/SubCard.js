import React from "react";
import "./SubCard.css";

function printStars(rating) {
    const stars = [];
    const fullStars = Math.floor(rating);           
    const fractionalPart = rating - fullStars;      
    const emptyStars = 5 - fullStars - (fractionalPart > 0 ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
        stars.push(
            <svg key={`full-${i}`} className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
        );
    }

    // Add a fractional star if needed
    if (fractionalPart > 0) {
        stars.push(
            <svg key="fractional" className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 20">
                <defs>
                    <linearGradient id="fractionalStarGradient">
                        <stop offset={`${fractionalPart * 100}%`} stopColor="currentColor" />
                        <stop offset={`${fractionalPart * 100}%`} stopColor="transparent" />
                    </linearGradient>
                </defs>
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" fill="url(#fractionalStarGradient)" />
            </svg>
        );
    }

    if (emptyStars !== 0) {
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
            );
        }
    }

    return <>{stars}</>;
}



function SubCard({ title, image, rating, price, large, disabled }) {
    const disabledClass = disabled ? "disabled" : "";
    return (
        <div className={`sub-card 
            ${large ? "large" : ""}
            ${!large && disabledClass === "disabled" ? "disabled" : ""}
            w-full max-w-sm bg-customRed border border-gray-200 rounded-lg shadow 
            ${large ? "scale-110 shadow-lg border-customRed-500" : ""}`}>
            <a href="/">
                <img className="p-8 rounded-t-lg" src={image} alt="product" />
            </a>
            <div className="px-5 pb-5">
                <a href="/">
                    <h5 className="title text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                </a>
                <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        {printStars(rating)}
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{rating}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="price text-3xl font-bold text-gray-900 dark:text-white">{price}/mois</span>
                    <a
                        href="/404"
                        className={`add-to-cart text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                                ${disabledClass === "disabled" ? "bg-gray-400 cursor-not-allowed" : "bg-customBlue hover:bg-customBlue-dark focus:ring-4 focus:outline-none focus:ring-customBlue-light"}`}
                        onClick={(e) => disabledClass === "disabled" && e.preventDefault()}
                    >
                        Add to cart
                    </a>
                </div>
            </div>
        </div>
    );
}

export default SubCard;