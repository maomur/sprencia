const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

function createToken(user) {
    const obj = {
        userId: user.id,
        username: user.name,
        exp_date: dayjs().add(5, 'minutes').unix(),
        roll: user.roll
    }
    console.log('ESTO ES OBJ', obj)
    return jwt.sign(obj, 'codehouse')
}


module.exports = {
    createToken
}