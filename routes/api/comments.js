const router = require('express').Router();
const CommentModel = require('../../models/opiniones.model');
const { checkToken, checkAdmin } = require('../middlewares');


//---------- RUTAS COMMENTARIOS ----------//

//Obtener todos los comentarios
router.get('/', async (req, res) => {
    try {
        const [resultado] = await CommentModel.getAllComments();
        res.json({ title: resultado })
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Obtener un comentario por Id
router.get('/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;
        const [resultado] = await CommentModel.getCommentById(commentId);
        res.json({ title: resultado })
    } catch (error) {
        res.json({ error: error.message })
    }

})

//Crear un usuario
router.post('/create', checkToken, checkAdmin, async (req, res) => {
    try {
        const [resultado] = await CommentModel.createComment(req.body);
        res.json({ tittle: resultado })
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Actualizar un comentario
router.post('/update/:commentId', checkToken, checkAdmin, async (req, res) => {
    try {
        const { commentId } = req.params;
        const [resultado] = await CommentModel.updateComment(commentId, req.body);
        res.json({ title: resultado })
    } catch (error) {
        res.json({ error: error.message })
    }

})

//Eliminar comentario por Id
router.get('/delete/:commentId', checkToken, checkAdmin, async (req, res) => {
    try {
        const { commentId } = req.params;
        const resultado = await CommentModel.deleteCommentById(commentId);
        res.json({ title: resultado })
    } catch (error) {
        res.json({ error: error.message })
    }

})



module.exports = router;