import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Cookies from "js-cookie";

const registerUser = async (email, password, firstName, lastName, phone, setMessage, setShowModal) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered:", userCredential.user);

    if (userCredential.user) {
      await sendEmailVerification(userCredential.user);

      const token = await userCredential.user.getIdToken();
      Cookies.set("auth_token", token, { expires: 0.0208 }); 

      setMessage(`Merci ${firstName} ! Un email de confirmation a été envoyé. Veuillez vérifier votre boîte mail.`);
      setShowModal(true);
    }
  } catch (error) {
    console.error("Error registering user:", error.message);
    setMessage("Erreur : " + error.message);
    setShowModal(true);
  }
};

export default function VendorRegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      setShowModal(true);
      return;
    }
    registerUser(email, password, firstName, lastName, phone, setMessage, setShowModal);
  };

  const closeModal = () => {
    setShowModal(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');
    setMessage('');
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto font-[sans-serif] p-6 ">
        <div className="px-6 py-3 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
          <div className='ml-0 font-costaStd '>
            <h1 className='text-4xl text-customRed'>Hey, Bienvenue !</h1>
          </div>
          <div className="text-center mb-6">
            <h2 className="text-customBlue text-base font-semibold mt-6">Créez votre compte EatyBox</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-8 text-customBlue">
              <div>
                <label className="text-sm mb-2 block">Prénom</label>
                <input 
                  name="firstName" 
                  type="text" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md outline-blue-500 transition-all" 
                  required 
                />
              </div>
              <div>
                <label className="text-sm mb-2 block">Nom</label>
                <input 
                  name="lastName" 
                  type="text" 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md outline-blue-500 transition-all" 
                  required 
                />
              </div>
              <div>
                <label className="text-sm mb-2 block">Numéro de téléphone</label>
                <input 
                  name="phone" 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md outline-blue-500 transition-all" 
                  pattern="(\+?[1-9]{1,3}[-\s]?)?([0-9]{2,3}[-\s]?){2,4}[0-9]{2,4}" 
                  required 
                />
              </div>
              <div>
                <label className="text-sm mb-2 block">Email</label>
                <input 
                  name="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md outline-blue-500 transition-all" 
                  placeholder="exemple@xyz.com" 
                  required 
                />
              </div>
              <div>
                <label className="text-sm mb-2 block">Mot de passe</label>
                <input 
                  name="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md outline-blue-500 transition-all" 
                  required 
                />
              </div>
              <div>
                <label className="text-sm mb-2 block">Confirmer le mot de passe</label>
                <input 
                  name="confirmPassword" 
                  type="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md outline-blue-500 transition-all" 
                  required 
                />
              </div>
            </div>
            <div className="!mt-12">
              <button 
                type="submit" 
                className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-customBlue hover:bg-customRed focus:outline-none"
              >
                S'inscrire
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg text-center font-semibold text-customBlue">{message}</p>
            <button 
              onClick={closeModal} 
              className="mt-4 px-6 py-2 bg-customBlue hover:bg-customRed text-white font-semibold rounded-md"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
