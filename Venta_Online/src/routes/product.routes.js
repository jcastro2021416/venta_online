'use strict'

const {Router} = require('express');
const {check} = require('express-validator');
const {validateParams} = require('../middlewares/validate-params');
const {validateJWT} = require("../middlewares/validate-jwt");
const { createProduct, listProducto, deleteProducto } = require('../controller/productController');

const api = Router();

api.post('/create-product', createProduct);
api.get('/list-product', listProducto);
api.delete('/delete-product/:id', deleteProducto);

module.exports = api;





