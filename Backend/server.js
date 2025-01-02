const express = require('express')
const app = express()
const port = 3000
const crypto = require('crypto');


// Middleware para analizar los cuerpos JSON de las solicitudes, osea convierte los 1 y 0 en algo que JS pueda entender
app.use(express.json())

/* -----------------------------------------------------------------------
    Base de datos simulada (solo como ejemplo en memoria)
    - La estrotura de las entradras conteneran uns propiedad de mensajes.
   ----------------------------------------------------------------------- */

const baseDeDatos = [{
  id: "00000000",
  titulo: "Una Entrada de Ejemplo",
  contenido: "Esta Entrada es solo un ejemplo",
  mensajes: [{
    entradaId: "00000000",
    id: "00000001",
    texto: "Mensaje; comentario de ejemplo"
  }]
}]


app.post('/', (req, res) => {
  /*
    Ejemplo de solicitud POST (crear un nuevo post anónimo):
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "titulo": "Mi primer post anónimo",
        "contenido": "Solo quería decir hola, anónimamente."
      }' \
      http://localhost:3000/
  */
  console.log('Se recibió una solicitud POST con el cuerpo:', req.body)
  // Aquí podrías agregar el nuevo post a la base de datos
  // baseDeDatos.push(req.body)
  const mensaje = req.body
  // mensaje.id = crypto.randomBytes(16).toString('hex')
  mensaje.id = "12345678"
  mensaje.mensajes = []
  baseDeDatos.push(req.body)
  res.send(201, 'Has creado un nuevo post anónimo')
})


app.get('/', (req, res) => {
  /*
    Ejemplo de solicitud GET (obtener posts anónimos):
    curl -X GET 'http://localhost:3000/?search=hola&sort=desc'
  */
  console.log('Se recibió una solicitud GET con parámetros de consulta:', req.query)
  // Para solicitudes GET, se pueden leer datos desde req.query
  res.send(200, baseDeDatos)
})


app.put('/', (req, res) => {
  /*
    Ejemplo de solicitud PUT (actualizar un post anónimo):
    curl -X PUT \
      -H "Content-Type: application/json" \
      -d '{
        "id": "12345678",
        "titulo": "Post anónimo actualizado",
        "contenido": "Cambiando mi contenido... ¡sigo siendo anónimo!"
      }' \
      http://localhost:3000/
  */
  console.log('Se recibió una solicitud PUT con el cuerpo:', req.body)
  // Aquí podrías actualizar un post en la base de datos, pero como sabemos cual entrada es?
  // si prodriamos usar el titulo pero que tal si el titulo cambia?
  // hay algo llamado uuid que es un identificador unico para cada entrada, hay que usar eso como una huella digital
  const entrada = baseDeDatos.find((element) => element.id === req.body.id)
  entrada.titulo = req.body.titulo
  entrada.contenido = req.body.contenido
  res.send(201, entrada)
})


app.delete('/', (req, res) => {
  /*
    Ejemplo de solicitud DELETE (eliminar un post anónimo):
    curl -X DELETE \
      -H "Content-Type: application/json" \
      -d '{
        "id": "12345678"
      }' \
      http://localhost:3000/
  */
  console.log('Se recibió una solicitud DELETE con el cuerpo:', req.body)
  // Aquí podrías eliminar un post de la base de datos
  const indx = baseDeDatos.findIndex((element) => element.id === req.body.id)
  baseDeDatos.splice(indx, 1)
  res.send(202, 'Lo Borramos papu')
})


/* -----------------------------------------------------------------------
   Sección CRUD para 'mensajes' (comentarios). Usaremos un nuevo arreglo.
   ----------------------------------------------------------------------- */


app.post('/mensajes', (req, res) => {
  /*
    Crear un mensaje:
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "entradaId": "00000000",
        "texto": "Mensaje creado por post request"
      }' \
      http://localhost:3000/mensajes
  */
  const mensaje = {
    // id: crypto.randomBytes(16).toString('hex'),
    id: "87654321",
    entradaId: req.body.entradaId,
    texto: req.body.texto
  }
  const indx = baseDeDatos.findIndex((element) => element.id === mensaje.entradaId)
  baseDeDatos[indx].mensajes.push(req.body)
  res.send(201, baseDeDatos[indx].mensajes)
})


app.get('/mensajes', (req, res) => {
  /*
    Leer todos los mensajes:
    curl -X GET "http://localhost:3000/mensajes?nombre=valor&entradaId=00000000"
  */
  console.log('=> Se recibió una solicitud GET para listar los mensajes', req.query)
  const indx = baseDeDatos.findIndex((element) => element.id === req.query.entradaId)
  res.send(200, baseDeDatos[indx].mensajes)
})


app.put('/mensajes/:id', (req, res) => {
  /*
    Actualizar un mensaje por índice:
    curl -X PUT \
      -H "Content-Type: application/json" \
      -d '{
        "entradaId": "00000000",
        "texto": "Mensaje modificado x"
      }' \
      http://localhost:3000/mensajes/00000001
  */
  console.log('req.body :', req.body)
  console.log('req.params :', req.params)
  const message = {
    entradaId: req.body.entradaId,
    texto: req.body.texto,
    id: req.params.id 
  }
  const indx = baseDeDatos.findIndex((element) => element.id === message.entradaId)
  const mesajeIndx = baseDeDatos[indx].mensajes.findIndex((element) => element.id === message.id)
  baseDeDatos[indx].mensajes[mesajeIndx] = message
  res.send(202, baseDeDatos[indx].mensajes[req.params.id])
  console.log('baseDeDatos :', baseDeDatos)

})


app.delete('/mensajes/:id', (req, res) => {
  /*
    Eliminar un mensaje por índice:
    curl -X DELETE http://localhost:3000/mensajes/00000001
  */
  const id = parseInt(req.params.id)
  baseDeDatos.forEach((en) => en.mensajes.forEach((ms, indx) => en.mensajes.splice(indx, 1)))
  console.log('id =>', id)
  res.send(204, 'mesaje borrado')
})

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`)
})
