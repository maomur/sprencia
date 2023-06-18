const db = require('../config/db').promise();


//--------------- USUARIOS MODEL ------------------//

//Listar todos los usuarios
const getAllUsers = () => {
    return db.query('SELECT * FROM users WHERE isDelete = 0 ORDER BY id DESC')
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
    return db.query('INSERT INTO users(name, lastname, ciudad, picture, email, password, roll, isDelete) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [name, lastname, ciudad, picture, email, password, roll, 0])
}

//Actualizar un usuario
const updateUser = (userId, { name, lastname, ciudad, picture, email, password, roll, isDelete }) => {
    return db.query('UPDATE users SET name = ?, lastname = ?, ciudad = ?, picture = ?, email = ?, password = ?, roll = ?, isDelete = ? WHERE id = ?', [name, lastname, ciudad, picture, email, password, roll, 0, userId])
}

//Eliminar un usuario haciendo Update
const deleteUserById = (userId) => {
    return db.query('UPDATE users SET isDelete = 1 WHERE id = ?', [userId])
}

//Reset password
const resetPassword = (id, { newPassword }) => {
    return db.query('UPDATE users SET password = ? WHERE id = ?', [newPassword, id]);
};




module.exports = {
    getAllUsers, getUserById, deleteUserById, createUser, updateUser, getUserByEmail, resetPassword
}