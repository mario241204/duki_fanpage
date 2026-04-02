const http = require('http');
const manejarRutas = require('./modules/router');

const PUERTO = 3000;

const servidor = http.createServer((req, res) => {
    manejarRutas(req, res);
});

servidor.listen(PUERTO, () => {
    console.log(`
    🎸 SERVIDOR DE FAN CLUB (DUKI) INICIADO
    ✔ Accede a la web en: http://localhost:${PUERTO}
    Escuchando peticiones...
    `);
});