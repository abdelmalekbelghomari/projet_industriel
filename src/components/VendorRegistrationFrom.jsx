import React from 'react';

export default function VendorRegistrationForm({logoPath}){
    return (
        <div class="min-h-screen flex flex-col items-center justify-center">
        <div class="max-w-4xl mx-auto font-[sans-serif] p-6 ">
            <div class="px-6 py-3 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
                <div className='ml-0 font-costaStd '>
                    <h1 className='text-4xl text-customRed'>Hey, Bienvenue !</h1>
                </div>
                <div class="text-center mb-16">
                    <h2 class="text-customBlue text-base font-semibold mt-6">Créez votre compte EatyBox</h2>
                </div>

                <form>
                    <div class="grid sm:grid-cols-2 gap-8 text-customBlue">
                    <div>
                        <label class=" text-sm mb-2 block">Prénom</label>
                        <input name="name" type="text" class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md  outline-blue-500 transition-all"  />
                    </div>
                    <div>
                        <label class=" text-sm mb-2 block">Nom de famille</label>
                        <input name="lname" type="text" class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md  outline-blue-500 transition-all"  />
                    </div>
                    <div>
                        <label class=" text-sm mb-2 block">Email</label>
                        <input name="email" type="text" class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md  outline-blue-500 transition-all" placeholder="exemple@xyz.com" />
                    </div>
                    <div>
                        <label class=" text-sm mb-2 block">Numéro de téléphone</label>
                        <input 
                            type="tel" 
                            class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md outline-blue-500 transition-all"  
                            id="phone" 
                            name="phone" 
                            pattern="(\+?[1-9]{1,3}[-\s]?)?([0-9]{2,3}[-\s]?){2,4}[0-9]{2,4}" 
                            required 
                            />
                    </div>
                    <div>
                        <label class=" text-sm mb-2 block">Mot de passe</label>
                        <input name="password" type="password" class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md  outline-blue-500 transition-all" />
                    </div>
                    <div>
                        <label class="text-sm mb-2 block">Confirmer le mot de passe</label>
                        <input name="cpassword" type="password" class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md  outline-blue-500 transition-all" />
                    </div>
                    </div>
                    <div class="!mt-12">
                    <button type="button" class="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-customBlue hover:bg-customRed focus:outline-none">
                        S'inscrire
                    </button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}
