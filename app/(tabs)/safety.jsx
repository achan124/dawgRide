import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView, Button } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalDropdown from 'react-native-modal-dropdown';

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

const SafetyMap = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isSelectingLocation, setIsSelectingLocation] = useState(false);
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [studentID, setStudentID] = useState('');
  const [reports, setReports] = useState(safetyReports);

  const issueTypes = [
    { label: 'Select Issue Type', value: '' },
    { label: 'Poor Lighting', value: 'lighting' },
    { label: 'Suspicious Activity', value: 'suspicious' },
    { label: 'Harassment', value: 'harassment' },
  ];

  const handleReportButtonPress = () => {
    setIsSelectingLocation(true); 
  };

  const handleMapPress = (event) => {
    if (isSelectingLocation) {
      const { coordinate } = event.nativeEvent;
      setSelectedLocation(coordinate);
      setModalVisible(true); 
      setIsSelectingLocation(false); 
    }
  };

  const handleSubmit = () => {
    if (!selectedLocation || !issueType || !studentID) {
      alert('Please fill out all required fields.');
      return;
    }

    const newReport = {
      id: reports.length + 1,
      position: [selectedLocation.latitude, selectedLocation.longitude],
      type: issueType,
      description: description,
      timestamp: new Date(),
    };

    // Add the new report to the list
    setReports([...reports, newReport]);

    // Reset form and close modal
    setModalVisible(false);
    setSelectedLocation(null);
    setIssueType('');
    setDescription('');
    setStudentID('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading1}>DawgRide</Text>

      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 47.655,
          longitude: -122.308,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        onPress={handleMapPress}
      >
        {reports.map((report) => (
          <Marker
            key={`report-${report.id}`} // Pass key directly
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

      {/* Report Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Report Unsafe Area</Text>
            <Text style={styles.locationText}>
              Selected Location: {selectedLocation ? `${selectedLocation.latitude.toFixed(4)}, ${selectedLocation.longitude.toFixed(4)}` : '--'}
            </Text>
            <ScrollView>
              <ModalDropdown
                options={issueTypes.map((item) => item.label)}
                defaultValue="Select Issue Type"
                onSelect={(index, value) => setIssueType(issueTypes[index].value)}
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                dropdownStyle={styles.dropdownMenu}
                dropdownTextStyle={styles.dropdownMenuText}
              />

              <TextInput
                style={styles.input}
                placeholder="Describe the issue (optional)"
                value={description}
                onChangeText={setDescription}
                multiline
              />

              <TextInput
                style={styles.input}
                placeholder="UW Student ID Number"
                value={studentID}
                onChangeText={setStudentID}
                keyboardType="numeric"
              />

              <Button title="Submit Report" onPress={handleSubmit} />
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="times" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Key */}
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

      {/* Report Button */}
      <TouchableOpacity style={styles.reportButton} onPress={handleReportButtonPress}>
        <Icon name="thumb-tack" size={30} color="white" />
      </TouchableOpacity>

      {/* Prompt for selecting location */}
      {isSelectingLocation && (
        <View style={styles.locationPrompt}>
          <Text style={styles.locationPromptText}>Tap on the map to select a location</Text>
        </View>
      )}
    </View>
  );
};

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

  map: {
    flex: 1,
  },

  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
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
    top: 125,
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
    alignItems: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  locationText: {
    fontSize: 14,
    marginBottom: 10,
  },

  dropdown: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  dropdownText: {
    fontSize: 14,
  },

  dropdownMenu: {
    width: '80%',
    marginTop: 8,
  },

  dropdownMenuText: {
    fontSize: 14,
  },

  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#F44336',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  locationPrompt: {
    position: 'absolute',
    top: 110,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
  },

  locationPromptText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SafetyMap;