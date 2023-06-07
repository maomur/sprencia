const db = require('../config/db').promise();

//Listar todas las categorías
const getCategories = () => {
    return db.query('SELECT * FROM category_courses')
};

const getCourses = (categoria) => {
    return db.query('SELECT * FROM courses WHERE categoria = ?', [categoria])
}



module.exports = {
    getCategories, getCourses
}