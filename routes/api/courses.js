const router = require('express').Router();
const CursoModel = require('../../models/curso.model');
const { checkToken, checkAdmin } = require('../middlewares');

//--------------- RUTAS CURSOS -----------------//

//Obtener todos los cursos límite 12
router.get('/', async (req, res) => {
    try {
        const [resultado] = await CursoModel.getAllCourses();
        const cursoLimitado = resultado.map((curso) => {
            const descripcionLimitada = curso.descripcion.substring(0, 70);
            return { ...curso, descripcion: descripcionLimitada + '...' }
        })
        res.json(cursoLimitado)
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Obtener todos los cursos sin límite
router.get('/all', async (req, res) => {
    const [resultado] = await CursoModel.getAllCoursesUnlimited();
    res.json(resultado)
})

//Obtener últimos 10 cursos
router.get('/lastcourses', async (req, res) => {
    try {
        const [resultado] = await CursoModel.getLastCourses();

        const cursoLimitado = resultado.map((curso) => {
            const descripcionLimitada = curso.descripcion.substring(0, 70);
            return { ...curso, descripcion: descripcionLimitada + '...' }
        })
        res.json(cursoLimitado)
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Cursos para Buscador
router.get('/search/:nombre', async (req, res) => {
    const [resultado] = await CursoModel.searchCourse()
    res.json(resultado)
})

//Filtrar un curso por Id
router.get('/course/:courseId', async (req, res) => {
    try {
        const { courseId } = req.params;
        const [resultado] = await CursoModel.getCourseById(courseId);
        res.json(resultado[0])
    } catch (error) {
        res.json({ error: error.message })
    }
})


//Filtrar cursos por Categoría
router.get('/:categoria', async (req, res) => {
    try {
        const { categoria } = req.params;
        const [resultado] = await CursoModel.getByCategory(categoria);
        const cursoLimitado = resultado.map((curso) => {
            const descripcionLimitada = curso.descripcion.substring(0, 70);
            return { ...curso, descripcion: descripcionLimitada + '...' }

        })
        res.json(cursoLimitado)
    } catch (error) {
        res.json({ error: error.message })
    }
})


//Eliminar un curso por Id
router.get('/delete/:courseId', checkToken, async (req, res) => {
    try {
        const { courseId } = req.params;
        const [resultado] = await CursoModel.deletCourseById(courseId);
        res.json(resultado)
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Crear un curso
router.post('/create', checkToken, checkAdmin, async (req, res) => {
    try {
        const [resultado] = await CursoModel.createCourse(req.body);
        res.json(resultado[0])
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Actualizar un curso
//checktoken, checkadmin
router.post('/update/:courseId', checkToken, async (req, res) => {
    try {
        const { courseId } = req.params;
        const [resultado] = await CursoModel.updateCourse(courseId, req.body);
        res.json(resultado)
    } catch (error) {
        res.json({ error: error.message })
    }
})



module.exports = router;