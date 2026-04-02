const http = require('http');
const manejarRutas = require('./modules/router');

// ESTE ES EL CAMBIO CLAVE: Usa el puerto que te dé el servidor o el 3000 por defecto
const PUERTO = process.env.PORT || 3000;

const servidor = http.createServer((req, res) => {
    manejarRutas(req, res);
});

// Añadimos '0.0.0.0' para que acepte conexiones externas en el servidor
servidor.listen(PUERTO, '0.0.0.0', () => {
    console.log(`
    🎸 SERVIDOR DE FAN CLUB (DUKI) INICIADO
    ✔ Puerto activo: ${PUERTO}
    Escuchando peticiones...
    `);
});
