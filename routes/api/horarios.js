const router = require('express').Router();
const HorariosModel = require('../../models/horarios.model');


//--------------- RUTAS HORARIOS -----------------//

//Obtener Horarios
router.get('/', async (req, res) => {
    const [resultado] = await HorariosModel.getHorarios();
    res.json(resultado)
})

//Listar Cursor por Horario
router.get('/:horario', async (req, res) => {
    const { horario } = req.params;
    const [resultado] = await HorariosModel.getCoursesByHorario(horario);
    const cursoLimitado = resultado.map((curso) => {
        const descripcionLimitada = curso.descripcion.substring(0, 70);
        return { ...curso, descripcion: descripcionLimitada + '...' }

    })
    res.json(cursoLimitado)
})

module.exports = router