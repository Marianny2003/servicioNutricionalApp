import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Input from '../components/Input';
import Card from '../components/Card';
import Botton from '../components/Botton';
import BottonCancel from '../components/BottonCancel';
import BottomNavBar from '../components/BottomNavBar';
import NavHead from '../components/NavHead';
import Container from '../components/Container';
import ContentContainer from '../components/contentContainer';
import useProfile from '../hooks/useProfile';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { useValidarContrasena, useValidarLasContrasenas } from '../hooks/useValidacion';

export default function CambioContraseñaScreen({ navigation }) {
  const { profile, handleUpdateProfile } = useProfile();
  const [contrasenia, setContrasenia, ErrorContrasenia, validarContrasenia, resetErrorContrasenia] = useValidarContrasena();
  const [contrasenia1, setContrasenia1, contrasenia2, setContrasenia2, ErrorContrasenias, validarContrasenias, resetErrorContrasenias] = useValidarLasContrasenas();

  const handleContraseniaChange = (text) => {
    setContrasenia(text);
    validarContrasenia();  
    if (contrasenia && !ErrorContrasenia ) {
      resetErrorContrasenia();
    }
  };

  const handleContrasenia1Change = (text) => {
    setContrasenia1(text);
    validarContrasenias();  
    if (contrasenia1 && !ErrorContrasenias ) {
      resetErrorContrasenias();
    }
  };

  const handleContrasenia2Change = (text) => {
    setContrasenia2(text);
    validarContrasenias();  
    if (contrasenia2 && !ErrorContrasenias ) {
      resetErrorContrasenias();
    }
  };

  const handleCambioContrasenia = () => {
    validarContrasenia();
    validarContrasenias();
    if (contrasenia && contrasenia1 && contrasenia2 && !ErrorContrasenia && !ErrorContrasenias) {
      if (contrasenia === profile.clave) {
        handleUpdateProfile('clave', contrasenia1);
        setContrasenia('');
        setContrasenia1('');
        setContrasenia2('');
        resetErrorContrasenia();
        resetErrorContrasenias();
        showMessage({
          message: 'Contraseña cambiada exitosamente!',
          description: 'Tu contraseña ha sido actualizada.',
          type: 'success',
        });
      } else {
        showMessage({
          message: 'Error de Contraseña!',
          description: 'La contraseña actual es incorrecta.',
          type: 'danger',
        });
      }
    } else {
      showMessage({
        message: 'Error de Datos!',
        description: 'Por favor ingresa todos los campos correctamente.',
        type: 'danger',
      });
    }
  };

  const handleCancelar = () => {
    setContrasenia('');
    setContrasenia1('');
    setContrasenia2('');
    resetErrorContrasenia();
    resetErrorContrasenias();
  };

  return (
    <Container>
      <FlashMessage position="center" />  
      <NavHead navigation={navigation} />
      <ContentContainer>
        <Header Titulo="Modificar Contraseña" />
        <Card>
          <Input
            label="Contraseña Actual"
            icon="lock"
            placeholder="Ingresar la Contraseña"
            value={contrasenia}
            onChangeText={handleContraseniaChange}
            onBlur={validarContrasenia} 
            error={ErrorContrasenia}
            iconError={ErrorContrasenia ? 'warning' : null}
          />
          <Input
            label="Nueva Contraseña"
            icon="lock"
            placeholder="Ingresar Nueva Contraseña"
            value={contrasenia1}
            onChangeText={handleContrasenia1Change}
            onBlur={validarContrasenias} 
            error={ErrorContrasenias}
            iconError={ErrorContrasenias ? 'warning' : null}
          />
          <Input
            label="Repetir Contraseña"
            icon="lock"
            placeholder="Repetir Nueva Contraseña"
            value={contrasenia2}
            onChangeText={handleContrasenia2Change}
            onBlur={validarContrasenias}  
            error={ErrorContrasenias}
            iconError={ErrorContrasenias ? 'warning' : null}
          />
          <View style={styles.buttonContainer}>
            <Botton title="Modificar" onPress={handleCambioContrasenia} />
            <BottonCancel title="Cancelar" onPress={handleCancelar} />
          </View>
          <Botton title="Modificar Datos del Perfil" onPress={() => navigation.navigate('Perfil')} />
        </Card>
      </ContentContainer>
      <BottomNavBar navigation={navigation} />
    </Container>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    width: '100%',
  },
});
