import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import useProfile from '../hooks/useProfile';
import Header from '../components/Header';
import Input from '../components/Input';
import Card from '../components/Card';
import Botton from '../components/Botton';
import BottonCancel from '../components/BottonCancel';
import BottomNavBar from '../components/BottomNavBar';
import NavHead from '../components/NavHead';
import Container from '../components/Container';
import ContentContainer from '../components/contentContainer';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { useValidarVacioNombre, useValidarVacioApellido, useValidarEmail } from '../hooks/useValidacion';
import * as ImagePicker from 'expo-image-picker';

export default function PerfilScreen({ navigation }) {
  const { profile, handleUpdateProfile } = useProfile();

  const [nombre, setNombre, errorNombre, validarNombre] = useValidarVacioNombre();
  const [apellido, setApellido, errorApellido, validarApellido] = useValidarVacioApellido();
  const [email, setEmail, errorEmail, validarEmail] = useValidarEmail();

  useEffect(() => {
    setNombre(profile.name);
    setApellido(profile.lastName);
    setEmail(profile.email);
  }, [profile]);

  const handleNombreChange = (text) => {
    setNombre(text);
    validarNombre();  
  };

  const handleApellidoChange = (text) => {
    setApellido(text);
    validarApellido();  
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    validarEmail();  
  };

  const handleImageChange = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      handleUpdateProfile('profileImage', result.assets[0].uri);
    }
  };

  const handleCambioPerfil = () => {
    validarApellido();
    validarNombre();
    validarEmail();

    if (nombre && apellido && email && !errorNombre && !errorApellido && !errorEmail) {
      handleUpdateProfile('name', nombre);
      handleUpdateProfile('lastName', apellido);
      handleUpdateProfile('email', email);

      setNombre('');
      setApellido('');
      setEmail('');
      showMessage({
        message: 'Modificado Exitosamente!',
        description: 'Datos Modificados del Perfil',
        type: 'success',
      });
    } else {
      showMessage({
        message: 'Error de Datos!',
        description: 'Ingrese los Datos correctamente.',
        type: 'danger',
      });
    }
  };

  return (
    <Container>
      <NavHead navigation={navigation} />
      <ContentContainer>
        <FlashMessage position="center" />
        <Header Titulo="Perfil del Usuario" />
        <Card>
          <View style={styles.profileImageContainer}>
            <TouchableOpacity onPress={handleImageChange}>
              <Image 
                source={profile.profileImage ? { uri: profile.profileImage } : require('../assets/user.png')} 
                style={styles.profileImage}
              />
              <Text style={styles.addImageText}>Agregar Imagen</Text>
            </TouchableOpacity>
          </View>

          <Input 
            label="Nombre" 
            icon="id-card" 
            value={nombre} 
            onChangeText={(text) => { handleNombreChange(text); handleUpdateProfile('name', text);}} 
            error={errorNombre} 
            iconError={errorNombre ? 'warning' : null} 
          />
          <Input 
            label="Apellido" 
            icon="id-card" 
            value={apellido} 
            onChangeText={(text) => { handleApellidoChange(text); handleUpdateProfile('lastName', text); }}  
            error={errorApellido} 
            iconError={errorApellido ? 'warning' : null}
          />
          <Input 
            label="Correo Electrónico" 
            icon="envelope"  
            value={email}  
            onChangeText={(text) => { handleEmailChange(text); handleUpdateProfile('email', text);}} 
            error={errorEmail} 
            placeholder="email@example.com" 
            iconError={errorEmail ? 'warning' : null} 
          />

          <View style={styles.buttonContainer}>
            <Botton title="Modificar" onPress={handleCambioPerfil} />
            <BottonCancel title="Cancelar" />
          </View>

          <Botton title="Cambiar Contraseña" onPress={() => navigation.navigate('CambioContraseña')} />
        </Card>
      </ContentContainer>
      <BottomNavBar navigation={navigation} />
    </Container>
  );
}

const styles = StyleSheet.create({
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#cfe4ff',
    marginBottom: 10,
  },
  addImageText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 14,
    backgroundColor: '#0066CC',
    borderColor: '#01154d',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    width: '100%',
  },
});
