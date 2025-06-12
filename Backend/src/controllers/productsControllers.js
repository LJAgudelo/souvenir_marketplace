import { pool } from '../config/db.js';
import {getAllProducts, modifyProduct,deleteAllProduct,getAllOffert,getAllFeatured,createNewproduct } from '../models/productsModels.js'


// consulta todos los productos
const getProducts = async(req,res) =>{

    try {
        const data = await getAllProducts();
        res.status(200).json(data)
    } catch (error) {
        console.error("error en getAllProducts",error.message)
        res.status(500).json({error:"Error al obtener los productos"});
    }
}

//selecciona todos los productos en oferta
const getOffert = async (req,res) =>{
    try {
        const data = await getAllOffert();
        res.status(200).json(data)
    } catch (error) {
        console.error("error en getAllOffert",error.message)
        res.status(500).json({error:"Error al obtener los productos"});
    }
}

//selecciona todos los productos destacados
const getFeatured = async (req,res) =>{
    try {
        const data = await getAllFeatured();
        res.status(200).json(data)
    } catch (error) {
        console.error("error en getAllFeatured",error.message)
        res.status(500).json({error:"Error al obtener los productos"});
    }
}

// crea un nuevo producto
const newProduct = async (req,res) => {
    console.log("Llega una petición POST /product");
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
    try {
        const {name,description,price,stock,} = req.body;
        let image_url = null;
        if (req.file) {
        image_url = `/uploads/${req.file.filename}`;
        }

        const result =await createNewproduct (name,description,price,stock,image_url);

         if (result)
             res.status(201).json({mensaje:"Producto insertado con exito"});
         else
             res.status(400).json({error:" no se pudo insertar el producto"})
        
    } catch (error) {
        console.error( "Error en agregar el producto",error.message);
        res.status(500).json({error:"error al instertar el producto"})
    }
}

// modifica el producto  dado por id
const updateProduct = async(req,res) =>{
   try {
     const {id}= req.params;
     const {name,description, price, stock, image_url,is_offer,is_featured} = req.body;
     const result = await modifyProduct (id,{name,description,price,stock,image_url,is_offer,is_featured});
 
     if (result)
         res.status(200).json( {message:"Producto actualizado con exito"});
     else
         res.status(400).json ({error:"No se pudo actualizar el producto"});
   } catch (error) {
    console.error("error en updateProductos",error.message);
    res.status(500).json({error:"Error al actualizar el producto"})
   }
};

// elimina un producto completo por id
const deleteProduct = async (req,res) =>{
try {
    const {id}= req.params;
    const result = await deleteAllProduct (id);
    if (result.rowCount > 0)
        res.status(200).json ({message:"Regsitro borrado con exito"});
    else
        res.status(400).json({error:"No se borro el producto"})
} catch (error) {
    console.error("error en deleteProduct",error.message)
    res.status(500).json({error:"no se a podido ejecutar la operacion"})
}
};


export { getProducts,updateProduct,deleteProduct,getOffert,getFeatured,newProduct  };