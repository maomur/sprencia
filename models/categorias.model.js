const db = require('../config/db').promise();


//--------------- CATEGORIAS MODEL ------------------//

//Listar todas las categorías
const getCategories = () => {
    return db.query('SELECT * FROM category_courses')
};

//Listar cursos por categoría
const getCourses = (categoria) => {
    return db.query('SELECT * FROM courses WHERE categoria = ?', [categoria])
}



module.exports = {
    getCategories, getCourses
}