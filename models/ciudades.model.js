const db = require('../config/db').promise();

//Listar todas las ciudades
const getCities = () => {
    return db.query('SELECT * FROM ciudades')
}

//listar cursos según ciudad
const coursesByCity = (ciudad) => {
    return db.query('SELECT * FROM courses WHERE ciudad = ?', [ciudad])
}


module.exports = {
    getCities, coursesByCity

}