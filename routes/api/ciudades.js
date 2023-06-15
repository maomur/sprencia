const router = require('express').Router();
const CiudadesModel = require('../../models/ciudades.model')


//--------------- RUTAS CIUDADES -----------------//

//Obtener todas las ciudades
router.get('/', async (req, res) => {
    const [resultado] = await CiudadesModel.getCities();
    res.json(resultado)
})

//Obtener cursos por ciudad
router.get('/:ciudad', async (req, res) => {
    const { ciudad } = req.params
    const [resultado] = await CiudadesModel.coursesByCity(ciudad);
    const cursoLimitado = resultado.map((curso) => {
        const descripcionLimitada = curso.descripcion.substring(0, 70);
        return { ...curso, descripcion: descripcionLimitada + '...' }

    })
    res.json(cursoLimitado)
})


module.exports = router;