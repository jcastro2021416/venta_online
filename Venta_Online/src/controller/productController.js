'use strict'

const Productos = require("../models/productModel");

//-----------------------------CRUD PRODUCT-------------------------------------
const createProduct = async(req, res)=>{
    const {name,stock} = req.body;
    try{
        let producto = await Productos.findOne({stock});
        if(producto){
            return res.status(400).send({
                msg: "Un stock ya se a registrado con un producto",
                ok: false, 
                producto: producto,
            });
        }
        producto = new Productos(req.body);
        producto = await producto.save();
        res.status(210).send({
            msg: `El producto ${name} se creo de forma correcta`,
            ok: true,
            producto: producto,
        });
    }catch(err){
        console.log(err)
        res.status(510).send({
            ok: false,
            msg: `No se a podido crear el producto: ${name}`,
            error: err,
        });
    }
}

//--------------------------------read------------------------------
const listProducto = async(req, res)=>{
    try{
        const product = await Productos.find();
        if(!product){
            res.status(401).send({
                msg: 'No hay productos disponibles'
            });
        }else{
            res.status(200).send({Productos_obtenidos: product})
        }
    }catch(err){
        throw new Error('Error al listar los productos')
    }
}

//------------------------------------------delete-----------------------------------
const deleteProducto = async(req, res) =>{
    try{
        const id = req.params.id;
        const result = await Productos.findByIdAndDelete(id);
        res.status(200).send({
            msg: 'El producto se ha eliminado de forma correcta', producto: result 
        })
    }catch(err){
        throw(err);
    }
}


module.exports = {
    createProduct,
    listProducto,
    deleteProducto
}





