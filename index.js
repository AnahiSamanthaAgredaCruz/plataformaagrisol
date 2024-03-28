//Realizamos la conexion  del backend con el servidor apollo y levantamos la base de datos con los datos de la var
const {ApolloServer} = require('apollo-server')
const typeDefs = require('./Backend/db/schemas')
const resolvers = require('./Backend/db/resolvers')
const conectarDB = require('./Backend/config/db')
const jwt = require('jsonwebtoken')

require('dotenv').config({path:'variables.env'})

//Levantar la Base de Datos
conectarDB()
//Definir el servidor
const servidor = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req})=> {
    const token = req.headers['authorization'] || ''
    if(token) {
      try {
        const usuario = jwt.verify(token, process.env.palabraSecreta)
        return {
          usuario
        }
      }catch (error){
        console.log('Hubo un error')
        console.log(error)
      }

    }
  }

})
//Levantado el servidor
servidor.listen().then(({url})=> {
  console.log(`El servidor esta levantado en la URL ${url}`);
});

