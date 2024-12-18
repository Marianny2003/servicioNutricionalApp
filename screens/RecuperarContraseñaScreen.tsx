import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Input from '../components/Input';
import Card from '../components/Card';
import Botton from '../components/Botton';
import useProfile from '../hooks/useProfile';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { useValidarEmail } from '../hooks/useValidacion';

export default function RecuperarContraseñaScreen({ navigation }) {
  const { profile } = useProfile();
  const [email, setEmail, errorEmail, validarEmail, resetEmail] = useValidarEmail();

  const handleEmailChange = (text) => {
    setEmail(text);
    validarEmail();  
  };

  const handlePasswordRecovery = () => {
    validarEmail();  
    if (email && !errorEmail) {
      if (email === profile.email) {
        showMessage({
          message: 'Correo Electrónico Enviado!',
          description: 'Revise su correo electrónico para recuperar la contraseña.',
          type: 'success',
        });
        setEmail('');
        resetEmail();
      } else {
        showMessage({
          message: 'Error de Correo!',
          description: 'El correo ingresado no está registrado.',
          type: 'danger',
        });
      }
    } else {
      showMessage({
        message: 'Error de Correo!',
        description: 'Ingrese un correo electrónico válido.',
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.container}>
      <FlashMessage position="top" />
      <Card>
        <View style={styles.header}>
          <Image source={require('../assets/logo.png')} style={styles.icon} />
          <Text style={styles.welcomeText}>Recuperar Contraseña</Text>
        </View>

        <Text style={styles.subtitle}>Ingresa tu correo electrónico para recuperar tu contraseña</Text>

        <Input
          label="Correo Electrónico"
          icon="envelope"
          placeholder="Ingresar el Correo Electrónico"
          value={email}
          onChangeText={handleEmailChange} 
          error={errorEmail} 
          iconError={errorEmail ? 'warning' : null}

        />

        <Botton title="Recuperar Contraseña" onPress={handlePasswordRecovery} />

        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.linkText}>Volver al Login</Text>
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
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 100,
    height: 70,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0066CC',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#808080',
    marginBottom: 25,
    textAlign: 'center',
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: '#0066CC',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
});
