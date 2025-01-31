import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "./firebaseConfig";

const PIXABAY_API_KEY = "48562770-cd16b819c4fa91e00f5dfbbe1"; // Replace this with your actual API key


const VendorProductManagement = () => {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Image selection state
    const [searchQuery, setSearchQuery] = useState("");
    const [imageOptions, setImageOptions] = useState([]);
    const [selectedImage, setSelectedImage] = useState("");

    const handleSearchImages = async () => {
        try {
            const response = await fetch(
                `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(searchQuery)}&lang=fr&image_type=photo&per_page=5`
            );
    
            const data = await response.json();
            
            if (data.hits.length > 0) {
                setImageOptions(data.hits.map((img) => img.webformatURL));  // Use images
            } else {
                console.log("❌ No results found.");
            }
        } catch (error) {
            console.error("❌ Error fetching images:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;

        if (!user) {
            alert("Utilisateur non authentifié !");
            return;
        }

        try {
            const productData = {
                vendorId: user.uid,
                vendorEmail: user.email,
                name: productName,
                price: parseFloat(productPrice),
                category: productCategory,
                description: productDescription,
                imageURL: selectedImage || "", // Save selected image
                createdAt: new Date(),
            };

            await addDoc(collection(db, "products"), productData);
            setSuccessMessage("Produit ajouté avec succès !");
            setProductName("");
            setProductPrice("");
            setProductCategory("");
            setProductDescription("");
            setSelectedImage("");
            setImageOptions([]);
        } catch (error) {
            console.error("Erreur lors de l'ajout du produit:", error);
        }
    };

    return (
        <div className="product-management-container">
            <h2 className="text-customRed text-2xl mb-4">Ajouter un produit</h2>
            {successMessage && <p className="text-green-600">{successMessage}</p>}

            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label>Nom du produit:</label>
                    <input 
                        type="text" 
                        value={productName} 
                        onChange={(e) => setProductName(e.target.value)} 
                        required 
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label>Prix (en €):</label>
                    <input 
                        type="number" 
                        value={productPrice} 
                        onChange={(e) => setProductPrice(e.target.value)} 
                        required 
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label>Catégorie:</label>
                    <input 
                        type="text" 
                        value={productCategory} 
                        onChange={(e) => setProductCategory(e.target.value)} 
                        required 
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label>Description:</label>
                    <textarea 
                        value={productDescription} 
                        onChange={(e) => setProductDescription(e.target.value)} 
                        className="form-input"
                    />
                </div>

                {/* Image Selection Section */}
                <div className="form-group">
                    <label>Recherche d'image :</label>
                    <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Ex: carotte, pain, fromage..."
                        className="form-input"
                    />
                    <button type="button" onClick={handleSearchImages} className="search-btn">
                        Rechercher des images
                    </button>
                </div>

                {/* Image Preview & Selection */}
                {imageOptions.length > 0 && (
                    <div className="image-grid">
                        {imageOptions.map((img, index) => (
                            <img 
                                key={index}
                                src={img}
                                alt="product option"
                                className={`image-option ${selectedImage === img ? "selected" : ""}`}
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>
                )}

                {selectedImage && <img src={selectedImage} alt="Selected" className="image-preview" />}

                <button type="submit" className="submit-btn">
                    Ajouter le produit
                </button>
            </form>
        </div>
    );
};

export default VendorProductManagement;
