import React from 'react'
import Sidebar from '../components/layout/Sidebar.jsx'
import Footer from '../components/layout/Footer.jsx'
import ButtonDelete from '../components/ui/ButtonDelete.jsx'
import ButtonSearch from '../components/ui/ButtonSearch.jsx'
import ButtonUpdate from '../components/ui/ButtonUpdate.jsx'

const ManageProduct = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Sidebar />
            <form className="flex-1 bg-[var(--createdlightYellow)] ml-0 lg:ml-[220px] transition-all duration-300">
                <div className="space-y-12 px-4 py-1 sm:px-6 lg:px-8">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h3 className="text-3xl font-bold mb-10 text-center">Manage Product</h3>

                        {/* Sección con 2 columnas: form + foto */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* FORMULARIO A LA IZQUIERDA */}
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="IdProduct" className="block text-sm font-medium text-gray-900 ">Id Product</label>
                                    <input
                                        type="number"
                                        id="IdProduct"
                                        name="IdProduct"
                                        placeholder="Id Product"
                                        min="1"
                                        step="1"
                                        className="rounded-md w-full mt-1 px-3 py-1 border border-gray-300 bg-[#fff8e7]"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="product-name" className="block text-sm font-medium text-gray-900 ">Product name</label>
                                    <input
                                        type="text"
                                        id="product-name"
                                        name="product-name"
                                        placeholder="Product name"
                                        className="rounded-md w-full mt-1 px-3 py-1 border border-gray-300 bg-[#fff8e7]"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-900">Price US$</label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        min="1"
                                        step="1"
                                        placeholder="Price US$"
                                        className="rounded-md w-full mt-1 px-3 py-1 border border-gray-300 bg-[#fff8e7]"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="stockAvailable" className="block text-sm font-medium text-gray-900">Stock available</label>
                                    <input
                                        type="number"
                                        id="stockAvailable"
                                        name="stockAvailable"
                                        placeholder="stock Available"
                                        min="1"
                                        step="1"
                                        className="rounded-md w-full mt-1 px-3 py-1 border border-gray-300 bg-[#fff8e7]"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-900">Product description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="2"
                                        placeholder="Write a few sentences about the product..."
                                        className="rounded-md w-full mt-1 px-3 py-1 border border-gray-300 bg-[#fff8e7]"
                                    />
                                </div>


                                <div className="flex items-center ">
                                    <input id="featuredProduct" type="checkbox" value="" name="featuredProduct" className="w-4 h-4  rounded-sm   " />
                                    <label for="featuredProduct" className="w-full py-4 ms-2 text-sm font-medium ">Featured Product</label>
                                    <input id="offerProduct" type="checkbox" value="" name="offerProduct" className="w-4 h-4  rounded-sm   " />
                                    <label for="offerProduct" className="w-full py-4 ms-2 text-sm font-medium ">Offer Product</label>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-900">Product photo</label>
                                <div className="mt-4 flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-[#fff8e7]">
                                    <div className="text-center">
                                        <svg className="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                                        </svg>
                                        <div className="mt-4 flex text-sm text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-[#fff8e7] font-semibold text-indigo-600 hover:text-indigo-500">
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>


                                </div>
                                <div className='flex justify-between px-5 py-5'>
                                    <ButtonDelete />
                                    <ButtonSearch />
                                    <ButtonUpdate />
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