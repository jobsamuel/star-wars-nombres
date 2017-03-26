/* star-wars-nombres
 *
 * Un mini-servidor que retorna nombres aleatorios
 * de personajes de Star Wars.
 *
 * Licencia MIT © 2017 despejala
 */

// Dependencias
const express = require('express');
const axios = require('axios');
const server = express();

/* Configuración del puerto.
 *
 * Permite el funcionamiento en el entorno local
 * y en el de producción; por ejemplo, en Heroku.
 */
server.set('port', process.env.PORT || 3000);

/* Método GET.
 *
 * Una vez inicializado el servidor, al acceder
 * (al enviar un HTTP GET Request) a la URL
 * el mismo responderá un nombre aleatorio
 * de un personaje de Star Wars.
 */
server.get('/:id?', callback);

/* Callback
 *
 * Se encarga de solicitar un nombre aleatorio
 * al API de Star Wars y retornarlo como respuesta.
 */
async function callback(req, res) {

  // Genera un número aleatorio (1-88).
  const aleatorio = Math.round(Math.random()*87 + 1);

  // Define el ID del personaje a buscar.
  const id = req.params.id || aleatorio;

  /* Declara una variable 'undefined' que posteriormente
   * tendrá el nombre del personaje o un mensaje de error,
   * según sea el caso.
   */
  let nombre;

  // Hace una petición al API de Star Wars.
  await axios(`http://swapi.co/api/people/${id}/`)
    .then(resultado => nombre = resultado.data.name)
    .catch(error => nombre = 'Ups! Algo salió mal.');

  // Aquí enviamos la respuesta.
  res.send(nombre).end();
}

/* Inicialización del servidor.
 *
 * Es aquí donde el servidor comienza a trabajar,
 * es decir, donde comienza a "escuchar" peticiones
 * (HTTP Requests) hechas al puerto previamente
 * configurado. Si todo está bien, debería mostrarse
 * (sólo una vez) en la consola el mensaje definido
 * en el callback.
 */
server.listen(server.set('port'), (error) => {
  if (error) {
    return console.error(error);
  }

  console.log('OK');
});
