'use strict'

const {Router} = require('express');
const {check} = require('express-validator');
const {validateParams}= require('../middlewares/validate-params');
const {validateJWT} = require("../middlewares/validate-jwt");
const {createUser, listUser, deleteUser, updateUser, loginUser} = require("../controller/userController");

const api = Router();

api.post("/create-user", createUser);
api.get("/list-user", listUser);
api.delete("/delete-user", validateJWT,deleteUser);
api.put("/update-user/:id", validateJWT, updateUser);
api.post("/login-user", loginUser);
module.exports = api;


