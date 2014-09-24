Simple API Rest con Autenticación a recursos

== Modo de Iniciarlo ==

node server.js

== Pruebas ==

node REST.js [parametros];

POST /login

node REST.js 1 User4 12345

GET /api/v1/admin/users

node REST.js 2 4 eyJ0eXAiOiJK...

GET /api/v1/admin/user/:id

node REST.js 3 2 4 eyJ0eXAiOiJK...
