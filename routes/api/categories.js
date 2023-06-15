const router = require('express').Router();
const CategoriaModel = require('../../models/categorias.model');


//--------------- RUTAS CATEGORÍAS -----------------//

//Obtener todas las categorías
router.get('/', async (req, res) => {
    const [resultado] = await CategoriaModel.getCategories()
    res.json(resultado)
});

//Obtener Curso según categoría
router.get('/:categoria', async (req, res) => {
    const { categoria } = req.params
    const [resultado] = await CategoriaModel.getCourses(categoria);
    const cursoLimitado = resultado.map((curso) => {
        const descripcionLimitada = curso.descripcion.substring(0, 70);
        return { ...curso, descripcion: descripcionLimitada + '...' }

    })
    res.json(cursoLimitado)
})


module.exports = router;