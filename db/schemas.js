const { gql } = require('apollo-server');

const typeDefs = gql `

    type Usuario_Agricultor {
        id: ID
        nombre: String
        apellido: String
        carnet_identidad: String
        direccion: String
        correo_electronico: String
        email: String
        creado: String
    }
    type Token {
        token: String
    }
       input Usuario_AgricultorInput {

        nombre: String!
        apellido: String!
        carnet_identidad: String!
        direccion: String!
        correo_electronico: String!
        email: String!
        password: String!

    }
      input Autentificar_AgricultorInput {
        email: String
        password: String
    }


    type Query {
        #Usuarios
        obtenerUsuario_Agricultor(token: String): Usuario_Agricultor


    }
    type Mutation {
        #Usuarios
        nuevoUsuario_Agricultor(input: Usuario_AgricultorInput): Usuario_Agricultor
        autentificarUsuario_Agricultor(input: Autentificar_AgricultorInput ): Token


}
`;
module.exports = typeDefs;
