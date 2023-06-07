const jwt = require('jsonwebtoken');
const UsuarioModel = require('../models/usuario.model');
const dayjs = require('dayjs')

const checkToken = async (req, res, next) => {

    //Coprobamos existencia de Token

    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ Error: 'No tienes permiso para acceder a este contenido (Sin cabecera)' })
    }
    //Validamos token
    let obj
    try {
        obj = jwt.verify(token, 'codehouse');
    } catch (error) {
        res.status(401).json({ error: 'No tienes permiso para acceder a este contenido. (Token inválido)' })
    }

    //Validamos caducidad
    if (dayjs().unix() > obj.exp_date) {
        return res.json({ error: 'el token está caducado' })
    }

    //Recuperamos información usuario
    const [usuario] = await UsuarioModel.getUserById(obj.userId)
    req.user = usuario[0];
    next()
}


const checkAdmin = (req, res, next) => {
    if (req.user.roll === "admin") {
        next()
    } else {
        return res.json({ error: "No tienes permiso para ver este contenido" })
    }
}


module.exports = {
    checkToken, checkAdmin
}