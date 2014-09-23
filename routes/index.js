var express = require('expres'),
    router  = express.Router();

var auth = require('./auth'),
    user = require('./users');

router.post('/login', auth.login);

router.get('/api/v1/admin/users', user.all)
router.get('/api/v1/admin/user/:id', user.get);
router.post('/api/v1/admin/user, user.add);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);

module.exports = router;

