import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts, BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts({ BebasNeue_400Regular });
  const [activeTab, setActiveTab] = useState('nightride'); 

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'nightride':
        return <NightRideContent />;
      case 'safetrip':
        return <SafeTripContent />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading1}>DawgRide</Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'nightride' && styles.activeTab]}
          onPress={() => setActiveTab('nightride')}
        >
          <Text style={[styles.tabText, activeTab === 'nightride' && styles.activeText]}>NightRide</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'safetrip' && styles.activeTab]}
          onPress={() => setActiveTab('safetrip')}
        >
          <Text style={[styles.tabText, activeTab === 'safetrip' && styles.activeText]}>SafeTrip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentArea}>
        {renderTabContent()}
      </ScrollView>

    </View>
  )
}

const NightRideContent = () => {
  const stops = {
    uwTower: { name: "UW Tower", position: [47.6611, -122.3147], number: 7 },
    alderHall: { name: "Alder Hall", position: [47.6546, -122.3174], number: 23 },
    IMA: { name: "IMA", position: [47.6535, -122.3019], number: 27 },
    comms: { name: "Communications Bldg", position: [47.6588, -122.3093], number: 26 },
    HUB: { name: "HUB", position: [47.6554, -122.3046], number: 25 },
    okanogan: { name: "Okanogan Lane", position: [47.6578, -122.3032], number: 28 },
    meany: { name: "Meany Hall", position: [47.6548, -122.3107], number: 14 },
    flagpole: { name: "Flagpole", position: [47.6566, -122.3084], number: 22 }
  };

  const shuttles = [
    {
      id: 1,
      position: [47.6550, -122.3080],
      eta: 5,
      occupancy: 5,
      nextStop: "flagpole",
      route: "East Campus"
    },
    {
      id: 2,
      position: [47.6585, -122.3130],
      eta: 12,
      occupancy: 3,
      nextStop: "uwTower",
      route: "West Campus"
    }
  ];

  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 47.655,
          longitude: -122.308,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {/* stop markers */}
        {Object.values(stops).map((stop, index) => (
          <Marker
          key={`stop-${index}`}
          coordinate={{ latitude: stop.position[0], longitude: stop.position[1] }}
          title={stop.name}
          description={`Stop Number: ${stop.number}`}
          >
            <Icon name="circle" size={15} color="black" />
          </Marker>
        ))}

        {/* shuttle markers */}
        {shuttles.map((shuttle) => (
          <Marker
          key={`shuttle-${shuttle.id}`}
          coordinate={{ latitude: shuttle.position[0], longitude: shuttle.position[1] }}
          title={`${shuttle.route ? shuttle.route : 'Shuttle'}`}
          description={`Next Stop: ${shuttle.nextStop} | ETA: ${shuttle.eta} min | Occupancy: ${shuttle.occupancy}`}
          >
            <Icon name="bus" size={30} color="#5A4A7B" />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const SafeTripContent = () => {
  const buildings = {
    ode: {name: "Odegaard", position: [47.6564, -122.3103]},
    paccar: {name: "Paccar", position: [47.6591, -122.3085]},
    maryGates: {name: "Mary Gates", position: [47.65485, -122.3078]},
    bagley: {name: "Bagley", position: [47.6535, -122.3089]},
    HUB: {name: "HUB", position: [47.6554, -122.3046]},
    suzzalo: {name: "Suzzalo", position: [47.6557, -122.3085]},
    denny: {name: "Denny Hall", position: [47.6584, -122.3087]},
    burke: {name: "Burke Museum", position: [47.6603, -122.3116]}
  };

  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 47.6565,
          longitude: -122.308,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >

        {Object.values(buildings).map((building, index) => (
          <Marker
          key={`building-${index}`}
          coordinate={{ latitude: building.position[0], longitude: building.position[1] }}
          title={building.name}
          >
            <Icon name="building" size={20} color="black" />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default App

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5A4A7B',
    flex: 1,
    paddingTop: 60,
  },

  heading1: {
    fontFamily: "BebasNeue_400Regular",
    color: 'white',
    fontSize: 26,
    textAlign: 'center',
    marginTop: 10,
  },
  
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 50,
    marginBottom: 20,
    marginTop: 20
  },

  tabButton: {
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    backgroundColor: '#1A0A3A',
  },

  activeTab: {
    backgroundColor: '#E3DCEF', 
  },

  activeText: {
    color: 'black',
  },

  tabText: {
    color: 'white',
    fontSize: 16,
  },

  contentArea: {
    flex: 1,
    backgroundColor: 'white'
  },

  contentText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  map: {
    width: '100%',
    height: 605,
  },
})