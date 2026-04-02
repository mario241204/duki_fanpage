const http = require('http');
const manejarRutas = require('./modules/router');

// Usamos el puerto de Render o el 3000
const PUERTO = process.env.PORT || 3000;

const servidor = http.createServer((req, res) => {
    // 1. Respuesta rápida para que Render dé el OK al puerto
    if (req.method === 'HEAD' || req.url === '/') {
        res.writeHead(200);
        res.end();
        return; 
    }

    // 2. Si no es la raíz, pasamos el control a tu router
    try {
        manejarRutas(req, res);
    } catch (error) {
        console.error("Error en el router:", error);
        res.writeHead(500);
        res.end("Error interno del servidor");
    }
});

// 3. Escuchamos en el puerto y en 0.0.0.0
servidor.listen(PUERTO, '0.0.0.0', () => {
    console.log(`🎸 Servidor DUKI Online en puerto ${PUERTO}`);
});
