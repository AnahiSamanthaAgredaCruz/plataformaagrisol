import React, { useState } from "react";
import Layout from "../componentes/Layout";
import { useMutation, gql } from "@apollo/client";
import {useFormik} from "formik";
import * as Yup from 'yup';

const NUEVO_USUARIO_AGRICULTOR = gql`
  mutation Mutation($input: Usuario_AgricultorInput) {
    nuevoUsuario_Agricultor(input: $input) {
      id
      nombre
      apellido
      carnet_identidad
      direccion
      telefono
      correo_electronico
    }
  }
`;

const NuevoUsuarioAgricultor = () => {
  const [mensaje, guardarMensaje] = useState(null);
  const [nuevoUsuarioAgricultor] = useMutation(NUEVO_USUARIO_AGRICULTOR);
  const router = useRouter();


  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      carnet_identidad: '',
      direccion: '',
      telefono: '',
      correo_electronico: '',
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required("El nombre es requerido."),
      apellido: Yup.string()
        .required("El apellido es requerido."),
      carnet_identidad: Yup.string()
        .required("El carnet de identidad es requerido."),
      direccion: Yup.string()
        .required("La dirección es requerida."),
      telefono: Yup.string()
        .required("El teléfono es requerido."),
      correo_electronico: Yup.string()
        .email("El correo electrónico no es válido.")
        .required("El correo electrónico es requerido."),
    }),
    onSubmit: async (valores) => {
      const {
        nombre,
        apellido,
        carnet_identidad,
        direccion,
        telefono,
        correo_electronico,
      } = valores;
      try {
        const { data } = await nuevoUsuarioAgricultor({
          variables: {
            input: {
              nombre,
              apellido,
              carnet_identidad,
              direccion,
              telefono,
              correo_electronico,
            },
          },
        });
        guardarMensaje(
          `El usuario agricultor ${data.nuevoUsuarioAgricultor.nombre} fue creado correctamente.`
        );
        setTimeout(() => {
          guardarMensaje(null);
          router.push('/login');
        }, 2000);
      } catch (error) {
        guardarMensaje(error.message);
        setTimeout(() => {
          guardarMensaje(null);
        }, 2000);
      }
    },
  });

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mensaje}</p>
      </div>
    );
  };

  return (
    <Layout>
      {mensaje && mostrarMensaje()}
      <div className="logo">
        <h1>AgroSol</h1>
      </div>
      <div className="container">
        <header>Registrar Nuevo Usuario Agricultor</header>
        <form onSubmit={handleSubmit} id="formularioUsuarioAgricultor">
          <div className="form first">
            <div className="details personal">
              <span className="title">Detalles Personales</span>
              <div className="fields">
                <div className="input-field">
                  <label>Nombre Completo</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Ingrese su nombre"
                    required
                  />
                </div>
                <div className="input-field">
                  <label>Apellido</label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    placeholder="Ingrese su apellido"
                    required
                  />
                </div>
                <div className="input-field">
                  <label>CI</label>
                  <input
                    type="text"
                    id="carnet_identidad"
                    name="carnet_identidad"
                    placeholder="Ingrese su carnet de identidad"
                    required
                  />
                </div>
                <div className="input-field">
                  <label>Dirección</label>
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    placeholder="Ingrese su dirección"
                    required
                  />
                </div>
                <div className="input-field">
                  <label>Teléfono</label>
                  <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    placeholder="Ingrese su teléfono"
                    required
                  />
                </div>
                <div className="input-field">
                  <label>Correo Electrónico</label>
                  <input
                    type="email"
                    id="correo_electronico"
                    name="correo_electronico"
                    placeholder="usuario.@gmail.com"
                    required
                  />
                </div>
                <div className="input-field">
                  <label>Fecha</label>
                  <input type="date" id="fecha" name="fecha" required />
                </div>
              </div>
            </div>
          </div>
          <input
            type="submit"
            value="Registrar"
            className="bg-indigo-500 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
          />
        </form>
      </div>
    </Layout>
  );
};

export default NuevoUsuarioAgricultor;
