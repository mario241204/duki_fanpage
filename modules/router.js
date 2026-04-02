const path = require('path');
const fs = require('fs'); // <--- ESTO ES LO QUE SOLIA FALTAR
const { servirFichero, procesarPost } = require('./utils');

// Definimos dónde están nuestras vistas y archivos públicos
const VIEWS_PATH = path.join(__dirname, '../views');
const PUBLIC_PATH = path.join(__dirname, '../public');

async function manejarRutas(req, res) {
    const { url, method } = req;
    console.log(`Petición recibida: [${method}] ${url}`);

    // --- 1. RUTAS DE PÁGINAS HTML (GET) ---
    if (method === 'GET') {
        switch (url) {
            case '/':
                servirFichero(path.join(VIEWS_PATH, 'index.html'), res);
                break;
            case '/historia':
                servirFichero(path.join(VIEWS_PATH, 'historia.html'), res);
                break;
            case '/discos':
                servirFichero(path.join(VIEWS_PATH, 'discos.html'), res);
                break;
            case '/videos':
                servirFichero(path.join(VIEWS_PATH, 'videos.html'), res);
                break;
            case '/contacto':
                servirFichero(path.join(VIEWS_PATH, 'contacto.html'), res);
                break;
            default:
                // --- 2. RUTAS DE ARCHIVOS ESTÁTICOS (CSS, IMÁGENES) ---
                if (url.startsWith('/public/')) {
                    const rutaArchivo = path.join(__dirname, '..', url);
                    servirFichero(rutaArchivo, res);
                } else {
                    // Error 404
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end('<h1>404 Not Found - Te has perdido en el backstage del Duko</h1>');
                }
        }
    }
    // --- 3. PROCESAMIENTO DE FORMULARIO (POST) ---
    else if (method === 'POST' && url === '/enviar-mensaje') {
        try {
            // A. Recibimos los datos
            const datos = await procesarPost(req);
            console.log("Datos recibidos:", datos);

            // B. Sacamos el nombre
            const parametros = new URLSearchParams(datos);
            const nombreUsuario = parametros.get('nombre') || 'Fan anónimo';

            // C. Leemos el archivo HTML de agradecimiento
            const rutaPlantilla = path.join(VIEWS_PATH, 'mensaje_enviado.html');

            fs.readFile(rutaPlantilla, 'utf8', (err, html) => {
                if (err) {
                    console.error("Error leyendo plantilla:", err);
                    res.writeHead(500);
                    res.end('Error interno: No encuentro mensaje_enviado.html');
                    return;
                }

                // D. Sustituimos {{NOMBRE}} por el nombre real
                const htmlFinal = html.replace('{{NOMBRE}}', nombreUsuario);

                // E. Enviamos la web bonita
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(htmlFinal);
            });

        } catch (error) {
            console.error(error);
            res.writeHead(500);
            res.end("Error al procesar formulario");
        }
    }
}

module.exports = manejarRutas;