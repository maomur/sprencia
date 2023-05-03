const router = require('express').Router();
const UsuarioModel = require('../../models/usuario.model');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { checkToken, checkAdmin } = require('../middlewares');
const { createToken } = require('../../helpers/utils')


//--------------- RUTAS USUARIOS -----------------//

// Obtener todos los usuarios
router.get('/', checkToken, checkAdmin, async (req, res) => {
    try {
        const [resultado] = (await UsuarioModel.getAllUsers());
        res.json({ title: resultado });
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Crear un usuario
router.post('/create', async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    try {
        const [resultado] = await UsuarioModel.createUser(req.body);
        res.json({ title: resultado })
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Obtener un usuario por Id
router.get('/:userId', checkToken, checkAdmin, async (req, res) => {
    try {
        const { userId } = req.params;
        const [resultado] = await UsuarioModel.getUserById(userId);
        res.json({ title: resultado })
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Actualizar un usario
router.post('/update/:userId', checkToken, async (req, res) => {
    try {
        const { userId } = req.params;
        const resultado = await UsuarioModel.updateUser(userId, req.body);
        res.json({ title: resultado })
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Eliminar usuario por Id
router.get('/delete/:userId', checkToken, checkAdmin, async (req, res) => {
    try {
        const { userId } = req.params;
        const resultado = await UsuarioModel.deleteUserById(userId);
        res.json({ title: resultado })
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Registro de un usuario

router.post('/register',
    body('email').isEmail().exists(),
    body('name').isLength({ min: 5 }),
    async (req, res) => {
        try {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const [resultado] = await UsuarioModel.createUser(req.body);
            res.json(resultado);
        } catch (error) {
            res.json({ error: error.message })
        }

    })


//Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const [resultado] = await UsuarioModel.getUserByEmail(email);
    console.log(resultado)

    const user = resultado[0];

    if (!resultado) {
        return res.json({ error: 'Error en email o contraseña' })
    }
    const equals = bcrypt.compareSync(password, user.password);
    console.log('iguales?', equals)


    if (equals) {
        // Login correcto
        res.json({ success: 'Login correcto', token: createToken(user) });
    } else {
        res.json({ error: 'Error en email y/o contraseña' });
    }

})


module.exports = router;