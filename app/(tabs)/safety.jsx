import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const app = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading1}>DawgRide</Text>
    </View>
  )
}

export default app

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
  }
})