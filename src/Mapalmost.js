import React, {Component} from 'react';
import {SafeAreaView, ScrollView, TouchableHighlight, Linking, StyleSheet, Text, View} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { colors, typography, dimensions } from './theme'
import { PROVIDER_GOOGLE } from 'react-native-maps';

import BaseHeader from './BaseHeader'

export default class Map extends Component {
  openMap = () => {
    Linking.openURL('http://www.google.com')
      .catch((err) => console.error('An error occurred', err));
  }
  render() {
    return (
      <SafeAreaView style={styles.outerContainer}>
        <BaseHeader />
        <View style={styles.container}>
        <View style={styles.mapContainer}>
          <ScrollView>
            <View style={styles.mapView}>

            <MapView style={{height: `50%`, width: `100%`}} 
            provider={PROVIDER_GOOGLE}/> 
            
              {/* <MapView
                style={styles.mapStyle}
                initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                  }}
                >
                  <View>
                    <Text style={{
                      fontSize: 24
                    }}>🚀</Text>
                  </View>
                </Marker>
              </MapView> */}

              <TouchableHighlight
                onPress={this.openMap}
                underlayColor='transparent'
              >
                <View style={styles.addressContainer}>
                  <Text style={[styles.address, styles.addressHeading]}>AWS Loft</Text>
                  <Text style={styles.address}>525 Market St #2</Text>
                  <Text style={styles.address}>San Francisco, CA 94105</Text>
                </View>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mapStyle: {
    width: dimensions.width - 40,
    height: 400,
    borderRadius: 5
  },
  addressContainer: {
    paddingVertical: 20
  },
  address: {
    color: colors.primaryText,
    fontSize: 18,
    marginBottom: 4,
    fontFamily: typography.primary
  },
  addressHeading: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
    color: colors.highlight
  },
  outerContainer: {
    flex: 1,
    backgroundColor: colors.primary
  },
  container: {
    flex: 1,
    backgroundColor: colors.primaryLight
  },
  mapContainer: {
    flex: 1
  },
  mapView: {
    padding: 20
  }
});
