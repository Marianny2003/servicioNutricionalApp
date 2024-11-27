import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';  

interface Info{
    title: string,
    cantidad ?: string,
    icon ?: string
}

export default function CardHome(props:Info) {
    
  return (
        <View style={styles.card}>
          <FontAwesome name={props.icon} size={70} color="#0066CC" />
          <Text style={styles.cardTitle}>{props.title}</Text>
          <Text style={styles.cardValue}>{props.cantidad}</Text>
        </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 5,
    margin:5,
    shadowColor: '#00000054',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    color: "#0066CC",
    marginBottom: 5,
    textAlign:'center',
    fontWeight:'bold'
  },
  cardValue: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#bbb",
    textAlign:'center'
  },

});
