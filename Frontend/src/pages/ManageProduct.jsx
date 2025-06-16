import React, { useState } from 'react'
import Sidebar from '../components/layout/Sidebar.jsx'
import Footer from '../components/layout/Footer.jsx'
import axios from 'axios'
import ButtonDelete from '../components/ui/ButtonDelete.jsx'
import ButtonSearch from '../components/ui/ButtonSearch.jsx'
import ButtonUpdate from '../components/ui/ButtonUpdate.jsx'

const ManageProduct = () => {

    const [product, setProduct] = useState(
        {
            id: '',
            name: '',
            price: '',
            stock: '',
            description: '',
            featured: false,
            offer: false,
            image: null
        }
    )

    const [previewImage, setPreviewImage] = useState(null);

    // Para el manejo de los cambios en inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct({
            ...product,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    // para manejar la imgaen
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProduct({ ...product, image: file });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    // funcion para remover la imagen
    const handleRemovePreview = () => {
        setPreviewImage(null);
        setProduct({ ...product, image: null });
    };

    // Buscar producto por ID
    const handleSearch = async () => {
        try {
            const res = await axios.get(`http://localhost:4001/product/${product.id}`);
            const data = res.data;
            setProduct({
                id: product.id,
                name: data.name,
                price: data.price,
                stock: data.stock,
                description: data.description,
                featured: data.is_featured || false,
                offer: data.is_offer || false,
                image: null
            });
            if (data.image_url) {
                setPreviewImage(`http://localhost:4001${data.image_url}`);
            } else {
                setPreviewImage(null);
            }

        } catch (err) {
            console.error(err);
            alert('Producto no encontrado');
        }
    };

    // Eliminar producto
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:4001/product/${product.id}`);
            alert('Producto eliminado');
            setProduct({
                id: '',
                name: '',
                price: '',
                stock: '',
                description: '',
                featured: false,
                offer: false,
                image: null
            });
            setPreviewImage(null);
        } catch (err) {
            console.error(err);
            alert('Error al eliminar');
        }
    };
    // Actualizar producto
    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('price', parseFloat(product.price) || 0);
            formData.append('stock', parseInt(product.stock) || 0);
            formData.append('description', product.description);
            formData.append('featured', product.featured);
            formData.append('offer', product.offer);

            // consulta la img si no cambia conserva la anterior
            if (product.image instanceof File) {
                formData.append("image", product.image);
            } else if (previewImage) {
                const imagePath = previewImage.replace("http://localhost:4001", "");
                formData.append("image_url", imagePath);
            }

            await axios.put(`http://localhost:4001/product/${product.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert('Producto actualizado');
            setProduct({
                id: '',
                name: '',
                price: '',
                stock: '',
                description: '',
                featured: false,
                offer: false,
                image: null
            });
        } catch (err) {
            console.error(err);
            alert('Error al actualizar producto');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Sidebar />
            <form className="flex-1 bg-[var(--createdlightYellow)] ml-0 lg:ml-[220px] transition-all duration-300">
                <div className="space-y-12 px-4 py-1 sm:px-6 lg:px-8">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h3 className="text-3xl font-bold mb-10 text-center">Admin - Manage Product</h3>

                        {/* Sección con 2 columnas: form + foto */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* FORMULARIO A LA IZQUIERDA */}
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="IdProduct" className="block text-sm font-medium text-gray-900 ">Id Product</label>
                                    <input
                                        type="number"
                                        name="id"
                                        value={product.id}
                                        onChange={handleChange}
                                        placeholder="Id Product"
                                        className="rounded-md w-full px-3 py-2 border border-gray-300 bg-[#fff8e7]"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="product-name" className="block text-sm font-medium text-gray-900 ">Product name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={product.name}
                                        onChange={handleChange}
                                        placeholder="Product name"
                                        className="rounded-md w-full px-3 py-2 border border-gray-300 bg-[#fff8e7]"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-900">Price US$</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={product.price}
                                        onChange={handleChange}
                                        placeholder="Price US$"
                                        className="rounded-md w-full px-3 py-2 border border-gray-300 bg-[#fff8e7]"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="stockAvailable" className="block text-sm font-medium text-gray-900">Stock available</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={product.stock}
                                        onChange={handleChange}
                                        placeholder="Stock available"
                                        className="rounded-md w-full px-3 py-2 border border-gray-300 bg-[#fff8e7]"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-900">Product description</label>
                                    <textarea
                                        name="description"
                                        value={product.description}
                                        onChange={handleChange}
                                        rows="2"
                                        placeholder="Product description"
                                        className="rounded-md w-full px-3 py-2 border border-gray-300 bg-[#fff8e7]"
                                    />
                                </div>
                                <div className="items-center flex ">
                                    <label className="w-full ms-2 text-sm font-medium">
                                        <input
                                            type="checkbox"
                                            name="featured"
                                            checked={product.featured}
                                            onChange={handleChange}
                                        />
                                        Featured Product
                                    </label>

                                    <label className="w-full ms-2 text-sm font-medium">
                                        <input
                                            type="checkbox"
                                            name="offer"
                                            checked={product.offer}
                                            onChange={handleChange}
                                        />
                                        Offer Product
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-900">Product photo</label>

                                <div className="mt-4 flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-[#fff8e7]">
                                    {previewImage ? (
                                        <img
                                            src={previewImage}
                                            alt="preview"
                                            className="object-contain w-full h-40"
                                        />
                                    ) : (
                                        <div className="text-center">
                                            <svg className="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
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
                                {previewImage && ( // este boton solo se activa cuando hay img y permite eliminarla
                                    <button
                                        type="button"
                                        onClick={handleRemovePreview}
                                        className="text-sm text-red-500 mt-2 underline"
                                    >
                                        Remove image
                                    </button>
                                )}
                                <div className="flex justify-between px-5 py-5">

                                    <ButtonSearch onClick={handleSearch} />
                                    <ButtonUpdate onClick={handleUpdate} />
                                    <ButtonDelete onClick={handleDelete} />
                                </div>



                            </div>

                        </div>
                    </div>
                </div>

            </form>
            <Footer />
        </div>

    )
}

export default ManageProduct