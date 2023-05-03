const db = require('../config/db').promise();

//Listar todas las opiniones
const getAllComments = () => {
    return db.query('SELECT * FROM comentarios WHERE isDelete = 0')
}

//Buscar una única opinión
const getCommentById = (commentId) => {
    return db.query('SELECT * FROM comentarios WHERE id = ?', [commentId])
}

//Agregar un comentario
const createComment = ({ comentario, fecha_comentario, estado, usuario }) => {
    return db.query('INSERT INTO comentarios(comentario, fecha_comentario, estado, usuario, isDelete) VALUES (?, ?, ?, ?, ?)', [comentario, fecha_comentario, estado, usuario, 0])
}

//Editar un comentario
const updateComment = (commentId, { comentario, fecha_comentario, estado, usuario, isDelete }) => {
    return db.query('UPDATE comentarios SET comentario = ?, fecha_comentario = ?, estado = ?, usuario = ?, isDelete = ? WHERE id = ?', [comentario, fecha_comentario, estado, usuario, isDelete, commentId])
}

//Eliminar un comentario haciendo un update
const deleteCommentById = (commentId) => {
    return db.query('UPDATE comentarios SET isDelete = 1 WHERE id = ?', [commentId])
}


module.exports = {
    getAllComments, getCommentById, createComment, updateComment, deleteCommentById
}