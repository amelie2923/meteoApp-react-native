import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { API_KEY } from '@env';
import axios from 'axios';
import CurrentWeather from './components/CurrentWeather';
import Forecasts from './components/Forecasts';

// import 'dotenv/config';
// require('dotenv').config();

// API_KEY = process.env.API_KEY;
// console.log(API_KEY);

const API_URL = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=fr&units=metric`

console.log(API_KEY);

export default function App() {
  // 1 : récupérer les coordonnées de l'utilisateur
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getCoordinates = async () => {
      // Attendre la permission de l'utilisateur d'utiliser sa position
      const { status } = await Location.requestForegroundPermissionsAsync();
      // Si l'utilisateur refuse :
      if (status !== 'granted') {
        return
      }
      // Si l'utilisateur accepte :
      const userLocation = await Location.getCurrentPositionAsync();
      getWeather(userLocation)
    }
    getCoordinates()
  }, [])

  // 2 : réaliser une requête vers notre serveur
  // ville
  // météo du moment
  // prévisions

  const getWeather = async (location) => {
    try {
      // TO DO : reformuler la requêt axios
      const response = await axios.get(API_URL(location.coords.latitude, location.coords.longitude));

      setData(response.data);

      setLoading(false);
    } catch (e) {
      // TO DO : remplacer par erreur réelle
      console.log("Erreur dans getWeather");
    }
  }

  //Afficher le loader
  if (loading) {
    return <View style={styles.container}>
      <ActivityIndicator size="small" color="#1a1a1c" />
    </View>
  }

  return (
    <View style={styles.container}>
      <CurrentWeather data={data} />
      <Forecasts data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E6E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
