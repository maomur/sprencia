const db = require('../config/db').promise();

//Listar todos los usuarios
const getAllUsers = () => {
    return db.query('SELECT * FROM users WHERE isDelete = 0')
}

//Buscar un único usuario por Id
const getUserById = (userId) => {
    return db.query('SELECT * FROM users WHERE id = ?', [userId])
}

//Buscar un único usuario por Email
const getUserByEmail = (email) => {
    return db.query('SELECT * FROM users WHERE email = ?', [email])
}

//Agregar un usuario
const createUser = ({ name, lastname, ciudad, picture, email, password, roll, isDelete }) => {
    return db.query('INSERT INTO users(name, lastname, ciudad, picture, email, password, roll, isDelete) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [name, lastname, ciudad, picture, email, password, roll, isDelete])
}

//Editar un usuario
const updateUser = (userId, { name, lastname, email, roll, password, picture, ciudad, isDelete }) => {
    return db.query('UPDATE users SET name = ?, lastname = ?, email = ?, roll = ?, password = ?, picture = ?, ciudad = ?, isDelete = ? WHERE id = ?', [name, lastname, email, roll, password, picture, ciudad, isDelete, userId])
}

//Eliminar un usuario haciendo Update
const deleteUserById = (userId) => {
    return db.query('UPDATE users SET isDelete = 1 WHERE id = ?', [userId])
}


module.exports = {
    getAllUsers, getUserById, deleteUserById, createUser, updateUser, getUserByEmail
}