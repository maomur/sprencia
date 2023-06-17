const db = require('../config/db').promise();


//--------------- OPINIONES MODEL ------------------//


//Listar todas las opiniones
const getAllComments = () => {
    return db.query('SELECT * FROM comentarios WHERE isDelete = 0 ORDER BY id DESC')
}

//Buscar una única opinión
const getCommentById = (commentId) => {
    return db.query('SELECT * FROM comentarios WHERE id = ?', [commentId])
}

//Obtener comentario por Id
const getCommentByCurso = (cursoId) => {
    return db.query('SELECT * FROM comentarios WHERE curso_id = ?', [cursoId])
}

//Agregar un comentario
const createComment = ({ comentario, fecha_comentario, estado, usuario, isDelete, curso, curso_id }) => {
    return db.query('INSERT INTO comentarios(comentario, fecha_comentario, estado, usuario, isDelete, curso, curso_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [comentario, fecha_comentario, estado, usuario, 0, curso, curso_id])
}

//Editar un comentario 
const updateComment = (commentId, { comentario, fecha_comentario, estado, usuario, isDelete, curso, curso_id }) => {
    return db.query('UPDATE comentarios SET comentario = ?, fecha_comentario = ?, estado = ?, usuario = ?, isDelete = ?, curso = ?, curso_id = ? WHERE id = ?', [comentario, fecha_comentario, estado, usuario, 0, curso, curso_id, commentId])
}

//Eliminar un comentario haciendo un update
const deleteCommentById = (commentId) => {
    return db.query('UPDATE comentarios SET isDelete = 1 WHERE id = ?', [commentId])
}


module.exports = {
    getAllComments, getCommentById, createComment, updateComment, deleteCommentById, getCommentByCurso
}