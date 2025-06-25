import React, { useState, useContext } from 'react';
import Sidebar from '../components/layout/Sidebar.jsx';
import Footer from '../components/layout/Footer.jsx';
import ButtonSave from '../components/ui/ButtonSave.jsx';
import ButtonDeleteImg from '../components/ui/ButtonDeleteImg.jsx';
import axios from 'axios';
import { UserContext } from '../context/userContext.jsx';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001';

const Sell = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        image: null,
    });

    const [previewImage, setPreviewImage] = useState(null);
    const { token } = useContext(UserContext);

    const handleChange = (e) => {
        const { name, value } = e.target;

        const newValue = name === "stock" ? (value === "0" ? "0" : value.replace(/^0+/, "")) : value;
        setProduct({ ...product, [name]: newValue });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProduct({ ...product, image: file });
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPreviewImage(previewUrl);
        }
    };

    const handleRemovePreview = () => {
        setPreviewImage(null);
        setProduct({ ...product, image: null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product.image) {
            alert("Please select an image for the product.");
            return;
        }

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('stock', product.stock);
        formData.append('image', product.image);
        console.log("Enviando producto:", [...formData.entries()]);
        try {
            await axios.post(`${API_URL}/product`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Producto creado exitosamente');
            window.location.reload();
        } catch (error) {
            console.error('Error al subir producto', error);
            alert('Error al crear producto');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Sidebar />
            <form onSubmit={handleSubmit} className="flex-1 bg-[var(--createdlightYellow)] ml-0 lg:ml-[220px] transition-all duration-300">
                <div className="space-y-12 px-4 py-10 sm:px-6 lg:px-8">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h3 className="text-3xl font-bold mb-10 text-center">Sell my product</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-900">Product name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={product.name}
                                        onChange={handleChange}
                                        placeholder="Product name"
                                        className="rounded-md w-full mt-1 px-3 py-2 border border-gray-300 bg-[#fff8e7]"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-900">Price US$</label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={product.price}
                                        onChange={handleChange}
                                        placeholder="Price US$"
                                        className="rounded-md w-full mt-1 px-3 py-2 border border-gray-300 bg-[#fff8e7]"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="stock" className="block text-sm font-medium text-gray-900">Stock available</label>
                                    <input
                                        type="number"
                                        id="stock"
                                        name="stock"
                                        value={product.stock}
                                        onChange={handleChange}
                                        placeholder="Stock available"
                                        min="0"
                                        className="rounded-md w-full px-3 py-2 border border-gray-300 bg-[#fff8e7]"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-900">Product description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={product.description}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Write a few sentences about the product..."
                                        className="rounded-md w-full mt-1 px-3 py-2 border border-gray-300 bg-[#fff8e7]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-900">Product photo</label>
                                <div className="mt-4 h-[300px] w-full flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 bg-[#fff8e7] overflow-hidden">
                                    {previewImage ? (
                                        <img src={previewImage} alt="Preview" className="w-full h-full object-contain" />
                                    ) : (
                                        <div className="text-center">
                                            <svg className="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M2.25 4.5A2.25 2.25 0 0 1 4.5 2.25h15A2.25 2.25 0 0 1 21.75 4.5v15a2.25 2.25 0 0 1-2.25 2.25h-15A2.25 2.25 0 0 1 2.25 19.5v-15Zm3 10.69L9 10.44l4.22 5.34h6.03a.75.75 0 0 0 .75-.75V4.5a.75.75 0 0 0-.75-.75h-15a.75.75 0 0 0-.75.75v10.69Zm13.5 1.56H9.28l-3.03-3.83-1.5 1.5v2.33c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-.75Z" clipRule="evenodd" />
                                            </svg>

                                            <div className="mt-4 flex text-sm text-gray-600 justify-center">
                                                <label htmlFor="image" className="cursor-pointer rounded-md bg-[#fff8e7] font-semibold text-indigo-600 hover:text-indigo-500">
                                                    <span>Upload a file</span>
                                                    <input
                                                        id="image"
                                                        name="image"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                        className="sr-only"
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    )}
                                </div>

                                <div className="rounded-md w-full mt-4 flex justify-center px-10 gap-15 py-3">
                                    <ButtonSave />
                                    <ButtonDeleteImg onClick={handleRemovePreview} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <Footer />
        </div>
    );
};

export default Sell;
