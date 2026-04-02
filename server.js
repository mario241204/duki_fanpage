const http = require('http');
const manejarRutas = require('./modules/router');

const PUERTO = process.env.PORT || 3000;

const servidor = http.createServer((req, res) => {
    // Si Render solo está "asomándose" para ver si el puerto está abierto
    if (req.method === 'HEAD') {
        res.writeHead(200);
        return res.end(); 
    }

    // Para todo lo demás (incluido entrar a la web), usamos tu router
    try {
        manejarRutas(req, res);
    } catch (error) {
        console.error("Error:", error);
        res.writeHead(500);
        res.end("Error en el servidor");
    }
});

servidor.listen(PUERTO, '0.0.0.0', () => {
    console.log(`🎸 Fanpage online en puerto ${PUERTO}`);
});
