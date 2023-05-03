const router = require('express').Router();
const apiCommentsRouter = require('./api/comments')
const apiCoursesRouter = require('./api/courses');
const apiUsersRouter = require('./api/users');

const { checkToken, checkAdmin } = require('./middlewares')

router.use('/courses', apiCoursesRouter)
router.use('/users', apiUsersRouter);
router.use('/comments', apiCommentsRouter)


module.exports = router;