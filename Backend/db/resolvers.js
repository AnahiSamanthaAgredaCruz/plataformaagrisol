const Usuario_Agricultor = require('../models/Usuario_Agricultor');

const bcryptjs = require('bcryptjs') //instalar la dependencia bycryps.js
const jwt = require('jsonwebtoken') //importamos la dependencia jwt para el token de usuario

require('dotenv').config({path:'variables.env'}) //para poder usar la clave la palabrasecreta de las variable de entorno
function CrearToken(usuarioagricultor,secreta,expiresIn){
  const {id,nombre,apellido, carnet_identidad,direccion,telefono,correo_electronico}= usuarioagricultor
  return jwt.sign({id,nombre,apellido, carnet_identidad,direccion,
    telefono,correo_electronico},secreta,{expiresIn})
}

const resolvers = {
  Query: {
    obtenerUsuarios_Agricultor: async () => {

      try {
        return await Usuario_Agricultor.find()
      } catch (error) {
        console.log(error)
      }
    },
    obtenerUsuario_Agricultor: (_, { token }) => {

      try{
        return jwt.verify(token, process.env.palabraSecreta)
      }catch (error) {
        console.log(error)
      }
    }
  },

  Mutation: {
      nuevoUsuario_Agricultor: async (_, { input }) => {

        const { correo_electronico, password } = input;
        //verificar si el usuario agricultor existe
        const existeAgricultor = await Usuario_Agricultor.findOne({ correo_electronico })
        if(existeAgricultor){
          throw new Error(`El usuario agricultor con ese correo ${correo_electronico}  ya existe.`)
        }
        //si no existe hashear el password

        const salt = await bcryptjs.genSaltSync(10);
        input.password = await bcryptjs.hash(password, salt);
        //grabar el usuario en la base de datos
        const nuevoUsuarioAgricultor = new Usuario_Agricultor(input)

        try {
          await nuevoUsuarioAgricultor.save()
          return nuevoUsuarioAgricultor

        } catch (error){
          console.log(error)
        }
      },

      autenticarUsuario_Agricultor: async (_, { input }) => {
        //verificar si el usuario existe por medio del correo
        const { correo_electronico, password } = input

        const existeAgricultor = await Usuario_Agricultor.findOne({correo_electronico})
        if(!existeAgricultor) {
          throw new Error(`El usuario con el correo ${correo_electronico} no existe`)
        }
          //verificar que la contraseña sea correcta
        const passwordCorrecto = await bcryptjs.compare(password, existeAgricultor.password);
          if(!passwordCorrecto)
          {
            throw  new Error(`La contraseña ${password} es incorrecta.`)
          }
          return { token: CrearToken(existeAgricultor, process.env.palabraSecreta,300000 ) }
        },
      }
    }
module.exports = resolvers;
