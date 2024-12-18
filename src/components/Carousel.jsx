import React from 'react';

function Carousel() {
    return (
        <div id="default-carousel" className="relative w-full" data-carousel="slide">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="https://www.google.com/imgres?q=funny%20memes&imgurl=https%3A%2F%2Fi.chzbgr.com%2Fthumb800%2F38150661%2FhE8FA3304%2Fhilarious-relatable-memes-coffee-memes-cold-funny-memes-coffee-winter-funny-holidays-latte-38150661&imgrefurl=https%3A%2F%2Fmemebase.cheezburger.com%2F&docid=sJbodmrDkxagNM&tbnid=HePTf5RwlunNBM&vet=12ahUKEwiU1PqIxp-KAxV4TKQEHXEDKCYQM3oECB0QAA..i&w=800&h=420&hcb=2&ved=2ahUKEwiU1PqIxp-KAxV4TKQEHXEDKCYQM3oECB0QAA" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="https://www.google.com/imgres?q=funny%20memes&imgurl=https%3A%2F%2Fpowertofly.com%2Fup%2Fmedia-library%2Fdistracted-boyfriend-sexist-boss-meme-your-idea-repeated-by-a-guy-your-boss-you-when-you-said-your-idea.jpg%3Fid%3D20568445%26width%3D800%26quality%3D90&imgrefurl=https%3A%2F%2Fpowertofly.com%2Fup%2Ffunny-boss-memes&docid=F9nOjqzhaQsdvM&tbnid=1FY1kWSiwilGTM&vet=12ahUKEwiU1PqIxp-KAxV4TKQEHXEDKCYQM3oECGIQAA..i&w=800&h=533&hcb=2&ved=2ahUKEwiU1PqIxp-KAxV4TKQEHXEDKCYQM3oECGIQAA" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="https://www.google.com/imgres?q=funny%20memes&imgurl=https%3A%2F%2Fi.chzbgr.com%2Fthumb800%2F37992709%2FhF0D6306A%2Ffunny-memes-dank-memes-memes-meme-funny-tweets-funny-twitter-funny-meme-funny-tumblr-funny-random&imgrefurl=https%3A%2F%2Fmemebase.cheezburger.com%2Fpage%2F9&docid=90BGW526xJjpOM&tbnid=1xyaWkmRl-SSMM&vet=12ahUKEwiU1PqIxp-KAxV4TKQEHXEDKCYQM3oECBgQAA..i&w=800&h=420&hcb=2&ved=2ahUKEwiU1PqIxp-KAxV4TKQEHXEDKCYQM3oECBgQAA" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="https://www.google.com/imgres?q=funny%20memes&imgurl=https%3A%2F%2Fstatic.demilked.com%2Fwp-content%2Fuploads%2F2024%2F09%2Frandom-memes-funny-1.jpeg&imgrefurl=https%3A%2F%2Fwww.demilked.com%2Frandom-memes-funny%2F&docid=habM6qXOaWCE4M&tbnid=anx1g1_Z2d2Y-M&vet=12ahUKEwiU1PqIxp-KAxV4TKQEHXEDKCYQM3oECF4QAA..i&w=700&h=892&hcb=2&ved=2ahUKEwiU1PqIxp-KAxV4TKQEHXEDKCYQM3oECF4QAA" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="https://www.google.com/imgres?q=funny%20memes&imgurl=https%3A%2F%2Fwww.rd.com%2Fwp-content%2Fuploads%2F2024%2F11%2F40-Funny-Christmas-Memes-That-Deliver-the-Holiday-Humor_FT.jpg&imgrefurl=https%3A%2F%2Fwww.rd.com%2Flist%2Fchristmas-memes%2F&docid=E-76GvG7cm1rIM&tbnid=LBw5d5NrcOj36M&vet=12ahUKEwiU1PqIxp-KAxV4TKQEHXEDKCYQM3oECHUQAA..i&w=1600&h=1600&hcb=2&ved=2ahUKEwiU1PqIxp-KAxV4TKQEHXEDKCYQM3oECHUQAA" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                </div>
            </div>
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
            </div>
            <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    );
}

export default Carousel;
