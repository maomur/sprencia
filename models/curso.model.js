const db = require('../config/db').promise();

//Listar todos los cursos
const getAllCourses = () => {
    return db.query('SELECT * FROM courses WHERE isDelete = 0')
}

//Buscar un único curso
const getCourseById = (courseId) => {
    return db.query('SELECT * FROM courses WHERE id = ?', [courseId])
}

//Agregar un curso
const createCourse = ({ nombre, descripcion, horario_inicio, horario_cierre, foto1, foto2, foto3, precio, estado }) => {
    return db.query('INSERT INTO courses(nombre, descripcion, horario_inicio, horario_cierre, foto1, foto2, foto3, precio, estado, isDelete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, descripcion, horario_inicio, horario_cierre, foto1, foto2, foto3, precio, estado, 0])
}

//Editar un curso
const updateCourse = (courseId, { nombre, descripcion, horario_inicio, horario_cierre, foto1, foto2, foto3, precio, estado, isDelete }) => {
    return db.query('UPDATE courses SET nombre = ?, descripcion = ?, horario_inicio = ?, horario_cierre = ?, foto1 = ?, foto2 = ?, foto3 = ?, precio = ?, estado = ?, isDelete = ? WHERE id = ?', [nombre, descripcion, horario_inicio, horario_cierre, foto1, foto2, foto3, precio, estado, isDelete, courseId])
}

//Eliminar un curso haciendo un Update
const deletCourseById = (courseId) => {
    return db.query('UPDATE courses SET isDelete = 1 WHERE id = ?', [courseId])
}


module.exports = {
    getAllCourses, getCourseById, createCourse, deletCourseById, updateCourse
}