const router = require('express').Router();
const UsuarioModel = require('../../models/usuario.model');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { checkToken, checkAdmin } = require('../middlewares');
const { createToken } = require('../../helpers/utils')


//--------------- RUTAS USUARIOS -----------------//

// Obtener todos los usuarios
//router.get('/', checkToken, checkAdmin, async (req, res) => {
router.get('/', async (req, res) => {
    try {
        const [resultado] = (await UsuarioModel.getAllUsers());
        res.json(resultado);
    } catch (error) {
        res.json({ error: error.message })
    }
})


//Eliminar usuario por Id
//checkToken, checkAdmin
router.get('/delete/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const [resultado] = await UsuarioModel.deleteUserById(userId);
        res.json(resultado)
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Crear un usuario
//checkToken, checkAdmin
router.post('/create', async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 9);
        const [resultado] = await UsuarioModel.createUser(req.body);
        res.json(resultado)
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Registro de un usuario
//checkToken, checkAdmin
router.post('/register',
    // body('email').isEmail().exists(),
    // body('name').isLength({ min: 5 }),
    async (req, res) => {
        try {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const resultado = await UsuarioModel.createUser(req.body);
            res.json(resultado);
        } catch (error) {
            res.json({ error: error.message })
        }

    })


//Actualizar un usario
//checkToken, checkAdmin
router.post('/update/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const resultado = await UsuarioModel.updateUser(userId, req.body);
        res.json(resultado)
    } catch (error) {
        res.json({ error: error.message })
    }
})


//Obtener Usuario por ID
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const [resultado] = await UsuarioModel.getUserById(userId);
        res.json(resultado[0])
    } catch (error) {
        res.json({ error: error.message })

    }
})


//Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const [resultado] = await UsuarioModel.getUserByEmail(email);
    if (resultado.length === 0) {
        return res.json({ error: 'Error en email o contraseña' })
    }
    const user = resultado[0];
    const equals = bcrypt.compareSync(password, user.password);

    if (equals) {
        // Login correcto
        res.json({ success: 'Login correcto', token: createToken(user) });
    } else {
        res.json({ error: 'Error en email y/o contraseña' });
    }

})


module.exports = router;