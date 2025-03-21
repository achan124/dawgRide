import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ensure FontAwesome is installed

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

// Helper function to get the appropriate icon for a report type
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

// Helper function to format the date
const formatDate = (date) => {
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

const SafetyMap = () => {
  return (
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
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },

  iconContainer: {
    width: 30, // Size of the circle
    height: 30, // Size of the circle
    borderRadius: 15, // Half of width/height to make it circular
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFC107', // Default color (will be overridden by dynamic color)
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
});

export default SafetyMap;