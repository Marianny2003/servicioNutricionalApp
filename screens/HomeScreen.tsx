import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';
import NavHead from '../components/NavHead';
import Container from '../components/Container';
import ContentContainer from '../components/contentContainer';
import CardHome from '../components/cardHome';
import GraficoCircular from '../components/GraficoCircular';
import { G } from 'react-native-svg';

export default function HomeScreen({ navigation }) {
  return (
    <Container>
      <NavHead navigation={navigation} />
      <ContentContainer>
        <Header Titulo="Bienvenido al Servicio Nutricional" />
        <View style={[styles.row, styles.cardTop]}>
          <CardHome title="Estudiantes" icon="graduation-cap" cantidad="9250" />
          <CardHome title="Asistencia" icon="check-circle" cantidad="2000" />
        </View>
        <View style={styles.row}>
          <CardHome title="Menús" icon="cutlery" cantidad="50" />
          <CardHome title="Eventos" icon="calendar" cantidad="34" />
        </View>
        <View style={styles.row}>
          <CardHome title="Inventario de Alimentos" icon="apple" cantidad="267" />
          <CardHome title="Inventario de Utensilios" icon="archive" cantidad="78" />
        </View>
        <GraficoCircular></GraficoCircular>
      </ContentContainer>
      <BottomNavBar navigation={navigation} />
    </Container>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    margin: 10,
  },
  cardTop: {
    marginTop: -65,
  },
});
