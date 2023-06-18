const router = require('express').Router();
const UsuarioModel = require('../../models/usuario.model');
const bcrypt = require('bcrypt');
const { checkToken, checkAdmin } = require('../middlewares');
const { createToken } = require('../../helpers/utils');
const { check } = require('express-validator');



//--------------- RUTAS USUARIOS -----------------//

// Obtener todos los usuarios
router.get('/', checkToken, checkAdmin, async (req, res) => {
    try {
        const [resultado] = (await UsuarioModel.getAllUsers());
        res.json(resultado);
    } catch (error) {
        res.json({ error: error.message })
    }
})


//Eliminar usuario por Id
router.get('/delete/:userId', checkToken, checkAdmin, async (req, res) => {
    try {
        const { userId } = req.params;
        const [resultado] = await UsuarioModel.deleteUserById(userId);
        res.json(resultado)
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Crear un usuario
router.post('/create', checkToken, checkAdmin, async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 9);
        const [resultado] = await UsuarioModel.createUser(req.body);
        res.json(resultado)
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Registro de un usuario
router.post('/register', async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const [resultado] = await UsuarioModel.createUser(req.body);
        res.json(resultado);
    } catch (error) {
        res.json({ error: error.message })
    }

})


//Actualizar un usario
router.put('/update/:userId', checkToken, checkAdmin, async (req, res) => {
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

//Obtener Usuario por Email
router.get('/searchUser/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const [resultado] = await UsuarioModel.getUserByEmail(email);
        res.json(resultado[0])
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Obtener Email de un usuario
router.get('/emailUser/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const [resultado] = await UsuarioModel.getUserByEmail(email);
        res.json(resultado[0].email)
    } catch (error) {
        res.json({ error: error.message })
    }
})


//Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const [resultado] = await UsuarioModel.getUserByEmail(email);
    if (resultado.length === 0 || email === "" || password === "") {
        return res.json({ error: 'Error en email o contraseña' })
    }
    const user = resultado[0];
    const equals = bcrypt.compareSync(password, user.password);

    if (equals) {
        // Login correcto
        res.json({ success: 'Login correcto', token: createToken(user), roll: user.roll });
    } else {
        res.json({ error: 'Error en email y/o contraseña' });
    }

})

//Reset Password TODO




module.exports = router;