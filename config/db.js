const mongoose = require('mongoose')

require('dotenv').config({path:'variables.env'})

const conectarDB = async ()=>{
  try {
    await mongoose.connect(process.env.DB_MONGO,{
      useNewUrlParser: true,
      useUnifiedTopology:true

    })
    console.log('la base de datos est conectada')
  }
  catch (error)
  {
    console.log('No se pudo conectar a la base de datos')
    console.log(error)
    process.exit(1)
  }
}

module.exports = conectarDB
