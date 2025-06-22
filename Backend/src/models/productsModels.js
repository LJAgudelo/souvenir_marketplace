import { pool } from "../config/db.js";


// consulta todos los productos
const getAllProducts= async() =>{
    const  { rows} = await pool.query("SELECT * FROM product");
    return rows;
}

//selecciona todos los productos en oferta
const getAllOffert = async () =>{
    const  {rows}= await pool.query ("SELECT * FROM product WHERE is_offer = TRUE")
    console.log("Productos en oferta desde la DB:", rows);
    return rows;

}

//selecciona todos los productos destacados
const getAllFeatured = async () =>{
    const  {rows}= await pool.query ("SELECT * FROM product WHERE is_featured = TRUE")
    return rows;

}

// crea un nuevo producto
const createNewproduct = async (name,description,price,stock,image_url) => {
    const values =[name,description,price,stock,image_url];
    const query ="INSERT INTO product (name, description, price, stock, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const result =await pool.query (query,values);
    return result.rows[0];
}

// modifica el producto  dado por id
const modifyProduct =async (id_product,{name,description, price, stock, image_url,is_offer,is_featured}) => {
    const query = "UPDATE product SET name = $1, description = $2, price = $3, stock = $4 , image_url =$5, is_offer =$6, is_featured =$7 WHERE id_product =$8 RETURNING *";
    const values=[name,description,price,stock,image_url,is_offer,is_featured,id_product];
    const result= await pool.query(query,values);
    return result.rows[0];
}

// elimina un producto completo por id
const deleteAllProduct = async (id_product) =>{
    const query = "DELETE FROM product WHERE id_product =$1 RETURNING *";
    const result = await pool.query(query,[id_product])
    return result;
}



export { getAllProducts,modifyProduct,deleteAllProduct,getAllOffert,getAllFeatured,createNewproduct  };