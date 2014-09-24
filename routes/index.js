var express = require('express'),
    router  = express.Router();

var auth = require('./auth'),
    users = require('./users');

router.post('/login', auth.login);

router.get('/api/v1/admin/users', users.all)
router.get('/api/v1/admin/user/:id', users.get);
router.post('/api/v1/admin/user', users.add);
router.put('/api/v1/admin/user/:id', users.update);
router.delete('/api/v1/admin/user/:id', users.delete);

module.exports = router;
