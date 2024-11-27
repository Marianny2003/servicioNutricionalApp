import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Input from '../components/Input';
import Card from '../components/Card';
import Botton from '../components/Botton';
import useProfile from '../hooks/useProfile';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import {useValidarUsuario, useValidarContrasena } from '../hooks/useValidacion';



export default function LoginScreen({ navigation }) {

  const { profile} = useProfile();
  const [usuario, setUsuario, ErrorUsuario, validarUsuario, resetUsuario]= useValidarUsuario();
  const [contrasenia, setContrasenia, ErrorContrasenia, validarContrasenia, resetContrasenia]= useValidarContrasena();

  const handleUsuarioChange = (text) => {
    setUsuario(text);
    validarUsuario();  
    if (usuario && !ErrorUsuario ) {
      resetUsuario();
    }
    
  };

  const handleContraseniaChange = (text) => {
    setContrasenia(text);
    validarContrasenia(); 
    if (contrasenia && !ErrorContrasenia ) {
      resetContrasenia();
    } 
  };
  
  const handleLogin = () => {
    validarUsuario();
    validarContrasenia();
    if (usuario && contrasenia && !ErrorUsuario && !ErrorContrasenia) {
      if(usuario == profile.cedula && contrasenia == profile.clave){
        navigation.navigate('Home');
        setUsuario(''); 
        setContrasenia('');
        resetContrasenia();
        resetUsuario();
      }
      else{
        showMessage({
          message: 'Error de Usuario o Contraseña!',
          description: 'Ingrese los Datos Correctamente.',
          type: 'danger',
        });
      }
    }
    else{
      showMessage({
        message: 'Error de Datos!',
        description: 'Ingrese los Datos Correctamente.',
        type: 'danger',
      });
    }
      
};

  return (
    <View style={styles.container}>
       <Card>
           <View >
              <View style={styles.img}>
                <Image source={require('../assets/logo.png')} style={styles.icon}/>
              </View>
          
              <Text style={styles.welcomeText}>Bienvenidos</Text>
           </View>

           <Text style={styles.subtitle}>Servicio Nutricional</Text>
           <Input label="Usuario" icon='user' placeholder='Ingresar el Usuario' value={usuario} onChangeText={handleUsuarioChange}  error={ErrorUsuario}   iconError={ErrorUsuario ? 'warning' : null}/>
           <Input label="Contraseña" icon='lock' placeholder='Ingresar Contraseña' value={contrasenia} onChangeText={handleContraseniaChange} onBlur={validarContrasenia}  error={ErrorContrasenia}  iconError={ErrorContrasenia ? 'warning' : null}/>

           <Botton title="Iniciar Sesión" onPress={handleLogin}/>
       
           <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('RecuperarContraseña')} >
             <Text style={styles.forgotPasswordText}>¿Has olvidado tu contraseña?</Text>
           </TouchableOpacity>
       </Card>
  </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1ECF4',
    paddingTop:'43%',
  },
  icon: {
    width: 100,
    height: 70,
    marginRight: 10,
    alignItems:'center',
    justifyContent:'center',
    marginTop:5,
  },
  img:{
    alignItems:'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0066CC',
    alignItems:'center',
    textAlign:'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#808080',
    marginBottom: 20,
    textAlign:'center',
  },
  forgotPassword: {
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#0066CC',
    fontSize: 14,
    textAlign:'center',
    marginBottom: 10,
  },
});
