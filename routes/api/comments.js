const router = require('express').Router();
const CommentModel = require('../../models/opiniones.model');
const { checkToken, checkAdmin } = require('../middlewares');



//---------- RUTAS COMMENTARIOS ----------//

//Obtener todos los comentarios
router.get('/', checkToken, checkAdmin, async (req, res) => {
    try {
        const [resultado] = await CommentModel.getAllComments();
        res.json(resultado)
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Obtener un comentario por Id
router.get('/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;
        const [resultado] = await CommentModel.getCommentById(commentId);
        res.json(resultado[0])
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Obtener un comentario por actividad
router.get('/curso/:cursoId', async (req, res) => {
    const { cursoId } = req.params;

    const [resultado] = await CommentModel.getCommentByCurso(cursoId);
    res.json(resultado)
})

//Eliminar comentario por Id
router.get('/delete/:commentId', checkToken, checkAdmin, async (req, res) => {
    try {
        const { commentId } = req.params;
        const [resultado] = await CommentModel.deleteCommentById(commentId);
        res.json(resultado)
    } catch (error) {
        res.json({ error: error.message })
    }

})

//Crear un Comentario
router.post('/create', checkToken, checkAdmin, async (req, res) => {
    try {
        const [resultado] = await CommentModel.createComment(req.body);
        res.json(resultado)
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Actualizar un comentario
router.put('/update/:id', checkToken, checkAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        const [resultado] = await CommentModel.updateComment(id, req.body);
        res.json(resultado)
    } catch (error) {
        res.json({ error: error.message })
    }

})


module.exports = router;