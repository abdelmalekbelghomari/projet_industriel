import React from "react";

function Card({ title, text1, text2, icon, link}) {
    return (
        <div className="flex flex-col bg-white text-customBlue rounded-lg pr-3 pl-3">
            <div className="flex flex-col">
                <h1 className="text-2xl pt-3">{title}</h1>
                <p className="text-customBlue">{text1}</p>
            </div>
            <div className="h-10"></div>
            <div className="flex flex-row items-center justify-between">
                <a className="text-customRed text-xl"href={link}>{text2}</a>
                <img className="w-10 rounded-t-lg" src={icon} alt={`${title} icon`} />
            </div>
        </div>
    );
}

export default Card;