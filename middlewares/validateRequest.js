var jwt          = require('jwt-simple');
    secretKey   = require('../config/secret')
    validateUser = require('../routes/auth').validateUser;

module.exports = function (req, res, next) {

  // Se salta el token de auth para peticiones de tipo [OPTIONS]
  if(req.method == 'OPTIONS') next();

  var token = (req.body && req.body.access_token) || (req.query && req.query_access_token) || req.headers['x-access-token'];
  var key   = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

  if(token || key){

    try {

      var decode = jwt.decode(token, secretKey());

      if(decode.exp <= Date.now){
        res.status(400);
        res.json({ status: 400, message: 'Token Expired' });
        return;
      }

      // Valida la autorización para ver si el usuario tiene acceso a los recursos
      var dbUser = validateUser(key);
      if(dbUser){

        var validateMod = req.url.indexOf('admin') >= 0 && dbUser.role == 'Administrador';
        var validateGen = req.url.indexOf('admin') < 0  && req.url.indexOf('/api/v1/') >= 0;

        console.log(req.url.indexOf('admin'));
        console.log(dbUser);
        console.log(dbUser.role == 'Administrador');

        if(validateMod || validateGen){
          next(); // Pasa al siguiente middleware
        }else{
          res.status(400);
          res.json({ status: 400, message: 'Not Authorized' });
          return;
        }

      }else{
        // Usuario no existente, retornar un error 401
        res.status(401);
        res.json({ status: 401, message: 'Invalid User' });
        return;
      }

    }catch(err){
      res.status(500);
      res.json({ status: 500, message: 'Oops something went wrong' });
      return;
    }

  }else{
    res.status(401);
    res.json({ status:401, message: 'Invalid Token or Key' });
    return;
  }

}
