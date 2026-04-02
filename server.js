const http = require('http');
const manejarRutas = require('./modules/router');

// ESTE ES EL CAMBIO CLAVE: Usa el puerto que te dé el servidor o el 3000 por defecto
const PUERTO = process.env.PORT || 3000;

const servidor = http.createServer((req, res) => {
    // Si Render pregunta para ver si estamos vivos (petición HEAD o raíz)
    if (req.method === 'HEAD' || req.url === '/') {
        res.writeHead(200);
        res.end();
        return; // Detenemos aquí para que no siga a manejarRutas
    }

    manejarRutas(req, res);
});
