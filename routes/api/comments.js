const router = require('express').Router();
const CommentModel = require('../../models/opiniones.model');
const { checkToken, checkAdmin } = require('../middlewares');


//---------- RUTAS COMMENTARIOS ----------//

//Obtener todos los comentarios
router.get('/', async (req, res) => {
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
        res.json(resultado)
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
// //checkToken, checkAdmin
router.get('/delete/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;
        const [resultado] = await CommentModel.deleteCommentById(commentId);
        res.json(resultado)
    } catch (error) {
        res.json({ error: error.message })
    }

})

//Crear un Comentario
// //checkToken, checkAdmin
router.post('/create', async (req, res) => {
    try {
        const [resultado] = await CommentModel.createComment(req.body);
        res.json(resultado)
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Actualizar un comentario
//checkToken, checkAdmin
router.post('/update/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;
        const [resultado] = await CommentModel.updateComment(commentId, req.body);
        res.json({ title: resultado })
    } catch (error) {
        res.json({ error: error.message })
    }

})


module.exports = router;