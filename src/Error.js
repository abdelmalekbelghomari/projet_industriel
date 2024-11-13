import React from 'react';
import Error404 from './assets/images/error404.jpeg';

function Error() {
    return (
        <div className="flex justify-center items-center h-screen">
            <img className="scale-200" src={Error404} alt="Error 404" />
        </div>
    );
}

export default Error;