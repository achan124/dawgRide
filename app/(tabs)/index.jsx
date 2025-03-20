import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const App = () => {
  const [activeTab, setActiveTab] = useState('nightride'); 

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
  <View style={styles.tabContent}>


  </View>
}

const SafeTripContent = () => {
  <View style={styles.tabContent}>


  </View>
}

export default App

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5A4A7B',
    flex: 1,
    paddingTop: 60,
  },

  heading1: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
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
    paddingHorizontal: 20,
    backgroundColor: 'white'
  },

  tabContent: {
    marginTop: 20,
  }
})
