const db = require('../config/db').promise();


//--------------- CURSOS MODEL ------------------//


//Listar cursos con límite 12
const getAllCourses = () => {
    return db.query('SELECT * FROM courses WHERE isDelete = 0 ORDER BY id DESC LIMIT 12')
}

//Listar todos los cursos
const getAllCoursesUnlimited = () => {
    return db.query('SELECT * FROM courses WHERE isDelete = 0 ORDER BY id DESC')
}

//Listar 10  últimos cursos por ID
const getLastCourses = () => {
    return db.query('SELECT * FROM courses WHERE isDelete = 0 ORDER BY id DESC LIMIT 12')
}

//Filtrar un único curso por Id
const getCourseById = (courseId) => {
    return db.query('SELECT * FROM courses WHERE id = ?', [courseId])
}

//Buscador de cursos
const searchCourse = (nombre) => {
    return db.query('SELECT * FROM courses WHERE isDelete = 0 ORDER BY nombre = ? DESC', [nombre])
}


//Filtrar cursos por Ciudad
const getByCity = (ciudad) => {
    return db.query('SELECT * FROM courses WHERE ciudad = ?', [ciudad])
}

//Filtrar cursos por Horario
const getByHorario = (horario) => {
    return db.query('SELECT * FROM courses WHERE horario = ?', [horario])
}

//Filtrar cursos por Categoría
const getByCategory = (category) => {
    return db.query('SELECT * FROM courses WHERE categoria = ?', [category]);
}

//Ordenar por Precio Descendente
const orderByPriceDesc = (precio) => {
    return db.query('SELECT * FROM  courses ORDER BY courses.precio DESC', [precio])
}

//Ordenar por Precio Ascendente
const orderByPriceAsc = (precio) => {
    return db.query('SELECT * FROM courses ORDER BY courses.precio ASC', [precio])
}

//Ordenar por Horario DESC
const orderByHorarioDesc = (horario) => {
    return db.query('SELECT * FROM courses ORDER BY courses.horario DESC')
}

//Ordenar por Horario ASC
const orderByHorarioAsc = (horario) => {
    return db.query('SELECT * FROM courses ORDER BY courses.horario ASC')
}

//Agregar un curso
const createCourse = ({ nombre, descripcion, ciudad, fecha_inicio, fecha_fin, foto1, foto2, foto3, precio, horario, total_horas, estado, isDelete, rating, categoria }) => {
    return db.query('INSERT INTO courses(nombre, descripcion, ciudad, fecha_inicio, fecha_fin, foto1, foto2, foto3, precio, horario, total_horas, estado, isDelete, rating, categoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, descripcion, ciudad, fecha_inicio, fecha_fin, '../../../assets/img/sprencia-marketing-digital.jpg', '../../../assets/img/curso-marketing-contenidos.jpg', '../../../assets/img/sprencia-curso-de-administracion-de-redes-sociales.jpg', precio, horario, total_horas, estado, 0, rating, categoria])
}

//Editar un curso
const updateCourse = (courseId, { nombre, descripcion, ciudad, fecha_inicio, fecha_fin, foto1, foto2, foto3, precio, horario, total_horas, estado, isDelete, rating, categoria }) => {
    return db.query('UPDATE courses SET nombre = ?, descripcion = ?, ciudad = ?, fecha_inicio = ?, fecha_fin = ?, foto1 = ?, foto2 = ?, foto3 = ?, precio = ?, horario = ?, total_horas = ?, estado = ?, isDelete = ?, rating = ?, categoria = ? WHERE id = ?', [nombre, descripcion, ciudad, fecha_inicio, fecha_fin, '../../../assets/img/sprencia-marketing-digital.jpg', '../../../assets/img/curso-marketing-contenidos.jpg', '../../../assets/img/sprencia-curso-de-administracion-de-redes-sociales.jpg', precio, horario, total_horas, estado, 0, rating, categoria, courseId])
}

//Eliminar un curso haciendo un Update
const deletCourseById = (courseId) => {
    return db.query('UPDATE courses SET isDelete = 1 WHERE id = ?', [courseId])
}


module.exports = {
    getAllCourses, getLastCourses, getCourseById, createCourse, deletCourseById, updateCourse, getByCategory, getByCity, getByHorario, orderByPriceDesc, orderByPriceAsc, orderByHorarioDesc, orderByHorarioAsc, searchCourse, getAllCoursesUnlimited
}