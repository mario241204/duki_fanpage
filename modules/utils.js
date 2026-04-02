const fs = require('fs');
const path = require('path');

// Diccionario de tipos MIME
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.js': 'text/javascript',
    '.mp4': 'video/mp4'
};

/**
 * Función para leer un archivo y enviarlo como respuesta
 */
function servirFichero(filePath, res) {
    const extension = path.extname(filePath);
    const contentType = mimeTypes[extension] || 'text/plain';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>Error 404: Pagina no encontrada</h1>');
            } else {
                res.writeHead(500);
                res.end('Error interno del servidor: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}

/**
 * Función para procesar los datos que vienen en un POST (Formulario)
 */
function procesarPost(req) {
    return new Promise((resolve, reject) => {
        let cuerpo = '';
        req.on('data', chunk => {
            cuerpo += chunk.toString();
        });
        req.on('end', () => {
            resolve(cuerpo);
        });
        req.on('error', (err) => reject(err));
    });
}

module.exports = { servirFichero, procesarPost };
