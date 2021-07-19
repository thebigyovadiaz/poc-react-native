import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Constants from 'expo-constants';

export default function App() {
  const [ubicacion, setUbicacion] = useState({});

  const searchLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      return Alert.alert('No tenemos los permisos necesarios para acceder a tu localización del móvil.')
    }

    const location = await Location.getCurrentPositionAsync();
    setUbicacion(location);
  }

  useEffect(() => {
    searchLocation()
  });

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        { ubicacion.coords
            ? <Marker
                coordinate={ubicacion.coords}
                title="Title Mark"
                description="Description to Mark"
              />
            : null
        }
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    marginTop: 25,
  }
});
