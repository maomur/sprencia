const router = require('express').Router();
const apiCommentsRouter = require('./api/comments')
const apiCoursesRouter = require('./api/courses');
const apiUsersRouter = require('./api/users');
const apiCategoriesRouter = require('./api/categories');
const apiCiudadesRouter = require('./api/ciudades');
const apiHorariosRouter = require('./api/horarios');


router.use('/courses', apiCoursesRouter)
router.use('/users', apiUsersRouter);
router.use('/comments', apiCommentsRouter);
router.use('/categories', apiCategoriesRouter);
router.use('/ciudades', apiCiudadesRouter);
router.use('/horarios', apiHorariosRouter);


module.exports = router;