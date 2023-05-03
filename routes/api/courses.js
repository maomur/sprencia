const router = require('express').Router();
const CursoModel = require('../../models/curso.model');
const { checkToken, checkAdmin } = require('../middlewares');

//--------------- RUTAS CURSOS -----------------//
// TODO => GET, POST, PUT, DELETE Ordenar!

//Obtener todos los cursos
router.get('/', async (req, res) => {
    try {
        const [resultado] = await CursoModel.getAllCourses();
        res.json({ title: resultado })
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Crear un curso
router.post('/create', checkToken, checkAdmin, async (req, res) => {
    try {
        const [resultado] = await CursoModel.createCourse(req.body);
        res.json({ title: resultado })
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Obtener un curso por Id
router.get('/:courseId', async (req, res) => {
    try {
        const { courseId } = req.params;
        const [resultado] = await CursoModel.getCourseById(courseId);
        res.json({ title: resultado })
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Actualizar un curso
router.post('/update/:courseId', checkToken, checkAdmin, async (req, res) => {
    try {
        const { courseId } = req.params;
        const [resultado] = await CursoModel.updateCourse(courseId, req.body);
        res.json({ title: resultado })
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Eliminar un curso por Id
router.get('/delete/:courseId', checkToken, checkAdmin, async (req, res) => {
    try {
        const { courseId } = req.params;
        const [resultado] = await CursoModel.deletCourseById(courseId);
        res.json({ title: resultado })
    } catch (error) {
        res.json({ error: error.message })
    }
})


module.exports = router;