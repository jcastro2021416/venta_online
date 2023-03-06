'use strict'

const Usuarios = require("../models/userModel");
const bcrypt = require('bcrypt');
const { generateJWT } = require("../helpers/create-jwt");

//-------------------------------create-------------------------------------------

const createUser = async(req, res)=>{
    const {name, email, password} = req.body;
    try{
        let usuario = await Usuarios.findOne({email});
        if(usuario){
            return res.status(400).send({
                msg: "Un usario ya se registro con el mismo correo",
                ok: false,
                usuario: usuario,
            });
        }
        usuario = new Usuarios(req.body);

        //Encripcion de controseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardar contraseña
        usuario = await usuario.save();

        //Creacion de token
                //Creacion de token
                const token = await generateJWT(user.id, user.name, user.email);
                res.status(200).send({
                    msg: `El usuario ${usuario.username} se ha creado de forma correcta`,
                    usuario,
                    token:token,
                })
        //Respues de que se genero de forma correcta
        
        res.status(210).send({
            msg: `El usuario ${name} se creo de forma correcta`,
            ok: true,
            usuario: usuario,
        })
    }catch(err){
        console.log(err)
        res.status(510).send({
            ok: false,
            msg: `No se a podido crear el usuario: ${name}`,
            error: err,
        });
    }
}

//----------------------------------------listar--------------------------------------------
const listUser = async(req, res)=>{
    try{
        const user = await Usuarios.find();
        if(!user){
            res.status(410).send({
                mgs: 'No hay usuario disponibles dentro de la db'
            });
        }else{
            res.status(200).send({alumnos_obtenidos: user})
        }
    }catch(err){
        throw new Error('Error al listar usuarios')
    }
}

//------------------------------------Delete------------------------------------------------

const deleteUser = async(req, res) =>{
    try{
        const id = req.params.id;
        const result = await Usuarios.findByIdAndDelete(id);
        res.status(200).send({
            msg: 'El usuario se elimino de forma correcta', user: result
        });
    }catch(err){
        throw(err);
    }
}

//------------------------------------------update--------------------------------------------

const updateUser = async(req, res) =>{
    try{
        const id = req.params.id;
        let editUsuarios = {...req.body};
        //Encriptacion de constraseña
        editUsuarios.password = editUsuarios.password
        ? bcrypt.hashSync(editUsuarios.password, bcrypt.compareSync())
        : editUsuarios.password;
        const userComplete = await Usuarios.findByIdAndUpdate(id, editUsuarios, {
            new: true,
        });
        {
            res.status(405).send({
                msg: 'Este usuario no existe dentro de la db'
            });
        }
    }catch(err){

    }
}

module.exports = {createUser, 
                listUser, 
                deleteUser, 
                updateUser,
            }





