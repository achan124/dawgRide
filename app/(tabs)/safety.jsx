import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const safetyReports = [
  {
    id: 1,
    position: [47.656, -122.313],
    type: 'lighting',
    description: 'Very dark area at night, needs better lighting',
    timestamp: new Date(2025, 2, 1, 22, 15),
  },
  {
    id: 2,
    position: [47.6575, -122.308],
    type: 'suspicious',
    description: 'Suspicious individual hanging around this area at night',
    timestamp: new Date(2025, 2, 2, 23, 30),
  },
  {
    id: 3,
    position: [47.653, -122.305],
    type: 'harassment',
    description: 'Verbal harassment reported by multiple students',
    timestamp: new Date(2025, 2, 2, 21, 45),
  },
];

const GetReportIcon = ({ type }) => {
  let iconName;
  let color;

  switch (type) {
    case 'lighting':
      iconName = 'lightbulb-o';
      color = '#FFC107'; 
      break;
    case 'suspicious':
      iconName = 'eye';
      color = '#2196F3'; 
      break;
    case 'harassment':
      iconName = 'user';
      color = '#F44336'; 
      break;
    default:
      iconName = 'exclamation-triangle';
      color = '#9C27B0'; // Purple
  }

  return (
    <View style={[styles.iconContainer, { backgroundColor: color }]}>
      <Icon name={iconName} size={20} color="white" />
    </View>
  );
};

const formatDate = (date) => {
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

const reportIncident = () => {

}

const SafetyMap = () => {
  return (
    <View style={styles.container}>

      {/* map */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 47.655,
          longitude: -122.308,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {safetyReports.map((report) => (
          <Marker
            key={`report-${report.id}`}
            coordinate={{
              latitude: report.position[0],
              longitude: report.position[1],
            }}
          >
            <GetReportIcon type={report.type} />
            <Callout tooltip>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>
                  {report.type.charAt(0).toUpperCase() + report.type.slice(1)} Issue
                </Text>
                <Text style={styles.calloutDescription}>{report.description}</Text>
                <Text style={styles.calloutTime}>
                  Reported: {formatDate(report.timestamp)}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* key */}
      <View style={styles.keyContainer}>
        <Text style={styles.keyTitle}>Safety Report Key</Text>
        <View style={styles.keyItem}>
          <View style={[styles.keyIcon, { backgroundColor: '#FFC107' }]}>
            <Icon name="lightbulb-o" size={16} color="white" />
          </View>
          <Text style={styles.keyText}>Lighting Issue</Text>
        </View>
        <View style={styles.keyItem}>
          <View style={[styles.keyIcon, { backgroundColor: '#2196F3' }]}>
            <Icon name="eye" size={16} color="white" />
          </View>
          <Text style={styles.keyText}>Suspicious Activity</Text>
        </View>
        <View style={styles.keyItem}>
          <View style={[styles.keyIcon, { backgroundColor: '#F44336' }]}>
            <Icon name="user" size={16} color="white" />
          </View>
          <Text style={styles.keyText}>Harassment</Text>
        </View>
      </View>

      {/* report button */}
      <TouchableOpacity style={styles.reportButton} onPress={() => reportIncident()}>
        <Icon name='thumb-tack' size={30} color="white" />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },

  iconContainer: {
    width: 30, 
    height: 30, 
    borderRadius: 15, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFC107', 
  },

  calloutContainer: {
    width: 200,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  calloutDescription: {
    fontSize: 14,
    marginBottom: 5,
  },

  calloutTime: {
    fontSize: 12,
    color: '#666',
  },

  keyContainer: {
    position: 'absolute',
    top: 75,
    left: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },

  keyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  keyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },

  keyIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  keyText: {
    fontSize: 14,
  },

  reportButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: '#1A0A3A',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default SafetyMap;