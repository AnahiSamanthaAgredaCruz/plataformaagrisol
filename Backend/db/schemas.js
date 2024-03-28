const { gql } = require('apollo-server');

const typeDefs = gql `

    #UsuarioAgricultor
    type Usuario_Agricultor {
        id: ID
        nombre: String
        apellido: String
        carnet_identidad: String
        direccion: String
        telefono: String
        correo_electronico: String
        creado: String
    }

    input Usuario_AgricultorInput {
        nombre: String!
        apellido: String!
        carnet_identidad: String!
        direccion: String!
        telefono: String!
        correo_electronico: String!
        password: String!
    }
       #Token
        type Token {
        token: String
    }
      input AutenticarInput {
        correo_electronico: String
        password: String
    }


    type Query {
        #Usuario
        obtenerUsuarios_Agricultor: [Usuario_Agricultor]
        obtenerUsuario_Agricultor(token: String): Usuario_Agricultor


    }
    type Mutation {
        #Usuarios
        nuevoUsuario_Agricultor(input: Usuario_AgricultorInput): Usuario_Agricultor
        autenticarUsuario_Agricultor(input: AutenticarInput): Token


}

`
module.exports = typeDefs
