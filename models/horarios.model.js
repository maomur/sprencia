const db = require('../config/db').promise();

//Listar todos los horarios
const getHorarios = () => {
    return db.query('SELECT * FROM horarios')
}

const getCoursesByHorario = (horario) => {
    return db.query('SELECT * FROM courses WHERE horario = ?', [horario])
}

module.exports = {
    getHorarios, getCoursesByHorario
}