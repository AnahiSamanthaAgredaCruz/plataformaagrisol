const mongoose = require('mongoose')

require('dotenv').config({ path: 'variables.env' })

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useCreateIndex: true, // Agregamos esta opción para evitar advertencias
    })
    console.log('La base de datos está conectada')
  } catch (error) {
    console.log('No se pudo conectar a la base de Datos')
    console.error(error.message) // Imprimimos el mensaje de error
    process.exit(1)
  }
}

module.exports = conectarDB
