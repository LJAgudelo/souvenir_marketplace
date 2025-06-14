import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar.jsx'
import Footer from '../components/layout/Footer.jsx'
import ButtonSave from '../components/ui/ButtonSave.jsx'
import axios from 'axios'
import ButtonDeleteImg from '../components/ui/ButtonDeleteImg.jsx'


const Sell = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock :'',
        image: null
    });

    const [previewImage, setPreviewImage] = useState(null);

    

     const handleChange = (e) => {
         const { name, value } = e.target;
         
        if (name === "stock") {
            const newValue = value === "0" ? "0" : value.replace(/^0+/, "");
            setProduct({ ...product, [name]: newValue });
         } else {
            setProduct({ ...product, [name]: value });
  }
     };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProduct({ ...product, image: e.target.files[0] });
         if (file) {
        const previewUrl = URL.createObjectURL(file);
        setPreviewImage(previewUrl);
        }
    };

        const handleRemovePreview = () => {
        setPreviewImage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('stock', product.stock); 
        formData.append('image', product.image);

        try {
             await axios.post('http://localhost:4001/product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
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

                            {/* FORMULARIO IZQUIERDA */}
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

                                <div>
                                    <label htmlFor="stock" className="block text-sm font-medium text-gray-900 ">Stock</label>
                                    <input
                                        type="number"
                                        id="stock"
                                        name="stock"
                                        value={product.stock}
                                        onChange={handleChange}
                                        placeholder="stock"
                                        min="0"
                                        inputMode="numeric"
                                        className="rounded-md w-24 mt-1 px-3 py-2 border border-gray-300 bg-[#fff8e7] no-spinner"
                                    />
                                </div>
                            </div>

                            {/* IMAGEN A LA DERECHA */}
                            <div>
                                 <label htmlFor="image" className="block text-sm font-medium text-gray-900">Product photo</label>
                                    <div className="mt-4 h-[300px] w-full flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 bg-[#fff8e7] overflow-hidden">
                                        {previewImage ? (
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="w-full h-full object-contain"
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

                                <div className="rounded-md w-full mt-4 px-3 py-2 bg-[var(--createdlightYellow)] flex gap-60">
                                    <ButtonSave />
                                    <ButtonDeleteImg onClick={handleRemovePreview}/>
                                    
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

export default Sell









// const Sell = () => {
//     return (
//         <>
//             <div className="flex flex-col min-h-screen">
//                 <Sidebar />
//                 <form className="flex-1 bg-[var(--createdlightYellow)] ml-0 lg:ml-[220px] transition-all duration-300">
//                     <div className="space-y-12 px-4 py-10 sm:px-6 lg:px-8">
//                         <div className="border-b border-gray-900/10 pb-12">
//                             <h3 className="text-3xl font-bold mb-10 text-center">Sell my product</h3>

//                             {/* Sección con 2 columnas: form + foto */}
//                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

//                                 {/* FORMULARIO A LA IZQUIERDA */}
//                                 <div className="space-y-6">
//                                     {/* Nombre del producto */}
//                                     <div>
//                                         <label htmlFor="product-name" className="block text-sm font-medium text-gray-900 ">Product name</label>
//                                         <input

//                                             type="text"
//                                             id="product-name"
//                                             name="product-name"
//                                             placeholder="Product name"
//                                             className="rounded-md w-full mt-1 px-3 py-2 border border-gray-300 bg-[#fff8e7]"
//                                         />
//                                     </div>

//                                     <div>
//                                         <label htmlFor="price" className="block text-sm font-medium text-gray-900">Price US$</label>
//                                         <input
//                                             type="number"
//                                             id="price"
//                                             name="price"
//                                             placeholder="Price US$"
//                                             className="rounded-md w-full mt-1 px-3 py-2 border border-gray-300 bg-[#fff8e7]"
//                                         />
//                                     </div>


//                                     <div>
//                                         <label htmlFor="description" className="block text-sm font-medium text-gray-900">Product description</label>
//                                         <textarea
//                                             id="description"
//                                             name="description"
//                                             rows="4"
//                                             placeholder="Write a few sentences about the product..."
//                                             className="rounded-md w-full mt-1 px-3 py-2 border border-gray-300 bg-[#fff8e7]"
//                                         />
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-900">Product photo</label>
//                                     <div className="mt-4 flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-[#fff8e7]">
//                                         <div className="text-center">
//                                             <svg className="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
//                                                 <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
//                                             </svg>
//                                             <div className="mt-4 flex text-sm text-gray-600">
//                                                 <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-[#fff8e7] font-semibold text-indigo-600 hover:text-indigo-500">
//                                                     <span>Upload a file</span>
//                                                     <input id="file-upload" name="file-upload" type="file" className="sr-only" />
//                                                 </label>
//                                                 <p className="pl-1">or drag and drop</p>
//                                             </div>
//                                             <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
//                                         </div>
//                                     </div>


//                                     <div className="rounded-md w-full mt-1 px-3 justify  py-2  bg-[var(--createdlightYellow)]">
//                                         <ButtonSave />
//                                     </div>

//                                 </div>

//                             </div>
//                         </div>
//                     </div>

//                 </form>
//                 <Footer />
//             </div>
//         </>
//     )
// }

// export default Sell
