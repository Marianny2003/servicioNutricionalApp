import React from 'react';
import { Text, StyleSheet, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux'; 

interface Info {
    Titulo?: string,
}

function Header(props: Info) {
  const { name, lastName } = useSelector((state) => state.profile);

  return (
    <ImageBackground source={require('../assets/header2.png')} style={styleHeader.header}>
      <Text style={styleHeader.title}>{props.Titulo}</Text>
      <Text style={styleHeader.subtitle}>{name} {lastName}</Text>
    </ImageBackground>
  );
}

export default Header;

const styleHeader = StyleSheet.create({
  header: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,  
    borderBottomRightRadius: 25,
    overflow: 'hidden',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
