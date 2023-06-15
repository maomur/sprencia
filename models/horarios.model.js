const db = require('../config/db').promise();

//--------------- HORARIOS MODEL ------------------//

//Listar todos los horarios
const getHorarios = () => {
    return db.query('SELECT * FROM horarios')
}

//Listar cursos por horario
const getCoursesByHorario = (horario) => {
    return db.query('SELECT * FROM courses WHERE horario = ?', [horario])
}

module.exports = {
    getHorarios, getCoursesByHorario
}