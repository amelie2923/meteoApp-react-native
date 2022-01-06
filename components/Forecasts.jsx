import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { format } from "date-fns";
import { fr } from "date-fns/locale"
import Weather from './Weather';

export default function Forecasts({ data }) {
  const [forecasts, setForecasts] = useState([]);

  useEffect(() => {
    //to do : add keys
    const forecastsData = data.list.map(forecast => {
      const dt = new Date(forecast.dt * 1000);
      return ({
        date: dt,
        hour: dt.getHours(),
        temp: Math.round(forecast.main.temp),
        icon: forecast.weather[0].icon,
        name: format(dt, "EEEE", { locale: fr })
      })
    })
    //Todo : logic to group elements by day
    setForecasts(forecastsData)
  }, [data])

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
    >
      {forecasts.map(forecast => (
        <View>
          <Text>{forecast.name}</Text>
          <Weather f={forecast} />
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    width: "100%",
    height: "35%"
  }
})