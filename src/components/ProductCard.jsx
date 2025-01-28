import React from "react";

function ProductCard({ title, text1, text2 ,price, image, link}) {
    return (
        <div className="flex flex-col bg-white text-customBlue rounded-lg pr-3 pl-3">
            <div className="h-3"></div>
            <img className="w-30 lg:h-48 md:h-30 object-cover rounded-lg" src={image} alt={`${title} icon`} />
            <div className="flex flex-col">
                <h1 className="text-2xl pt-3">{title}</h1>
                <p className="text-customBlue">{text1}</p>
            </div>
            <div className="h-10"></div>
            <div className="flex flex-row items-center justify-between pb-3">
                <p className="text-customBlue text-xl">{price}</p>
                <a className="text-customRed text-xl"href={link}>{text2}</a>
            </div>
        </div>
    );
}

export default ProductCard;