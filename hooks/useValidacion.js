import { useState } from "react";

export const useValidarVacioNombre = () => {
  const [error, setError] = useState(null);
  const [nombre, setNombre] = useState('');
  const validar = () => {
    if (!nombre || nombre.trim() === "") {
      setError("El campo no puede estar vacío!");
    } else {
      setError(null);
    }
  };

  const resetErrorNombre =()=>{
    setError("");
  };

  return [nombre, setNombre, error, validar, resetErrorNombre];
};

export const useValidarVacioApellido = () => {
  const [error, setError] = useState(null);
  const [apellido, setApellido] = useState('');
  const validar = () => {
    if (!apellido || apellido.trim() === "") {
      setError("El campo no puede estar vacío!");
    } else {
      setError(null);
    }
  };

  const resetErrorApellido =()=>{
    setError("");
  };

  return [apellido, setApellido, error, validar, resetErrorApellido];
};


export const useValidarEmail = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");

  const validar = () => {
    if (!email || email.trim() === "") {
      setError("El correo electrónico no puede estar vacío!");
    } else {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!regex.test(email)) {
        setError("El formato del correo electrónico es incorrecto!");
      } else {
        setError(null);
      }
    }
  };

  const resetErrorEmail =()=>{
    setError("");
  };

  return [email, setEmail, error, validar, resetErrorEmail];
};


export const useValidarUsuario = () => {
  const [error, setError] = useState(null);
  const [usuario, setUsuario] = useState("");

  const validar = () => {
    if (!usuario || usuario.trim() === "") {
      setError("El usuario no puede estar vacío!");
    } else if (!/^\d{7,8}$/.test(usuario)) {
      setError("El usuario debe tener entre 7 y 8 dígitos!");
    } else {
      setError(null);
    }
  };

  const resetErrorUsuario =()=>{
    setError("");
  };

  return [usuario, setUsuario, error, validar, resetErrorUsuario];
};

export const useValidarContrasena = () => {
  const [error, setError] = useState(null);
  const [contrasena, setContrasena] = useState("");

  const validar = () => {
    if (!contrasena || contrasena.trim() === "") {
      setError("La contraseña no puede estar vacía!");
    } else {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\*\-_\.\;\,\(\)\"@#\$=])[A-Za-z\d\*\-_\.\;\,\(\)\"@#\$=]{8,12}$/;
      if (!regex.test(contrasena)) {
        setError(
          "La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, un número y un carácter especial!"
        );
      } else {
        setError('');
      }
    }
  };

  const resetErrorContrasenia =()=>{
    setError("");
  };

  return [contrasena, setContrasena, error, validar, resetErrorContrasenia];
};

export const useValidarLasContrasenas = () => {
  const [contrasena1, setContrasena1] = useState('');
  const [contrasena2, setContrasena2] = useState('');
  const [error, setError] = useState(null);

  const validar = () => {
    if (!contrasena1 || contrasena1.trim() === "") {
      setError("La primera contraseña no puede estar vacía!");
      return;
    }
    else{
      setError('');
    }
    
    if (!contrasena2 || contrasena2.trim() === "") {
      setError("La segunda contraseña no puede estar vacía!");
      return;
    }
    else{
      setError('');
    }

    if (contrasena1.length < 8) {
      setError("Las contraseñas deben tener al menos 8 caracteres!");
      return;
    }
    else{
      setError('');
    }

    const tieneMayuscula = /[A-Z]/.test(contrasena1);
    const tieneNumero = /\d/.test(contrasena1);
    const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(contrasena1);

    if (!tieneMayuscula || !tieneNumero || !tieneCaracterEspecial) {
      setError("La contraseña debe contener al menos una letra mayúscula, un número y un carácter especial!");
      return;
    }
    else{
      setError('');
    }

    if (contrasena1 !== contrasena2) {
      setError("Las contraseñas no coinciden!");
      return;
    }
    else{
      setError('');
    }

    
  };

  const resetErrorContrasenias =()=>{
    setError("");
  };

  return [contrasena1, setContrasena1, contrasena2, setContrasena2, error, validar, resetErrorContrasenias];
};

