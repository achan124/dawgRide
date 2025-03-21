import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Collapsible from 'react-native-collapsible';

const FAQ_DATA = {
  general: [
    {
      question: 'How do you book a ride with SafeTrip?',
      answer: 'You can book a Husky SafeTrip by clicking on the map icon in the task bar and navigating to the SafeTrip tab. \n\n 1. Click the "Enter Pick-up Information" tab at the bottom and type in your valid student ID number and phone number. \n\n 2. Click submit and then search for and select an on-campus building to be picked up at. \n\n 3. Add yourself to the queue! You can check the drivers ETA on the map as well as the queue that indicates how many users are in front of you in the queue line. \n\n 4. Keep your phone on in case the driver needs to call to get your exact location for pickup.',
    },
    {
      question: 'How does Dawgride provide information about the NightRide Service?',
      answer: 'The DawgRide map provides the live locations of the shuttles following the loop and the locations of the nearest stop students can get picked up yet. By clicking on the spot icons, students are able to view the stop number and location. They can also select their pickup location and be directed to where it is on campus in respect to the shuttles.',
    },
    {
      question: 'How do I use the safety map and report concerns?',
      answer: 'You can submit a safety report by clicking on the report icon in the bottom right of the safety map and filling out the report form. \n\n\u2022 Input your valid student ID number to verify your report. \n\u2022 Select a report type and location and write a small description about your report. \n\u2022 Submit your report.',
    },
  ],

  nightride: [
    {
      question: 'How do I identify the shuttle?',
      answer: 'NightRide shuttles are white and purple ADA accessible shuttle buses with “Transportation Services” written on one side and a Dubs image displayed on the other.',
    },
    {
      question: 'Where do I board the shuttle?',
      answer: 'Except for the IMA and UW Tower stops, all stops share a King County Metro bus stop and are designated as NightRide stops by a decal posted on the bus schedule kiosk. \n\n Drivers open the shuttle doors at each stop and scan the area for potential riders before proceeding to the next stop. For stop descriptions, check out the route schedules for the East zone and West zone. You can also view the Zone map for a visual of the stop locations.',
    },
    {
      question: 'What if I want to be dropped off at a location not on the list of scheduled stops?',
      answer: 'This is called a deviation, a riders requested drop off location within the zone boundaries (but not along the scheduled route). The service will only drop off at scheduled stops while traveling along the scheduled stops route. However, riders may remain on the bus and request a deviation at the Flagpole stop, the last scheduled stop on campus (East deviations from an East zone shuttle and West deviations from a West zone shuttle). After the Flagpole stop, East and West zone shuttles continue on to drop off riders in the East and West zones. (See service routes for the East zone and West zone.)',
    },
    {
      question: 'What if I want to be dropped off in the East Zone or West Zone?',
      answer: 'If you want to be dropped off at a scheduled stop in the East zone, you need to be on an East zone shuttle. If you want to be dropped off at a scheduled stop in the West zone, you need to be on a West zone shuttle.',
    },
    {
      question: 'What if I board an East Zone bus but need to get to a West Zone stop?',
      answer: 'You have two options: \n\n\u2022 Option 1: You could remain on the East zone shuttle and let the driver know you wish to transfer to a West zone shuttle at the Flagpole stop. \n\n\u2022 Option 2: You could exit at any of the six stops in the East zone, and wait for a West zone bus to arrive, in which case there is no need to transfer to another shuttle at the Flagpole stop',
    },
    {
      question: 'What if I boarded a West Zone bus, but need to get an East Zone stop?',
      answer: 'All four NightRide shuttles service the East zone stops. So, if you board a West zone bus, you will get to all East zone stops by staying on board. Depending on where you board, it may mean riding the entire route to get to an East zone stop (for example, if you board at the HUB and want to go to the IMA).',
    },
    {
      question: 'Who can I talk to for more information?',
      answer: 'UW Shuttles staff are available Monday through Friday from 7:30 a.m. to 4 p.m. at 206-685-3146 or at shuttles@uw.edu. During NightRide service hours you can call 206-300-9087 to reach the dispatch center.',
    },
  ],

  safetrip: [
    {
      question: 'What destinations are allowed?',
      answer: 'You can book a Husky SafeTrip From campus to your home, your car, or another UW building within the SafeTrip service area. \n\n Husky SafeTrips is not available for:\n\u2022 Trips between two off-campus, non-UW locations \n\u2022 Routine transportation needs \n\u2022 Rides during inclement weather \n\u2022 Medical escorts',
    },
    {
      question: 'Why was the name changed?',
      answer: 'The Husky NightWalk is now Husky SafeTrip to better reflect the service — its a ride with a security guard, not a walk.',
    },
    {
      question: 'Does Husky SafeTrip offer any other services?',
      answer: 'In addition to booking rides, Husky SafeTrip guards can assist with \n\n\u2022 Jump-starting dead car batteries \n\u2022 Building & office lockouts (Proper ID required)',
    },
  ],
};

const FAQItem = ({ question, answer, isActive, onPress }) => (
  <View style={styles.faqItem}>
    <TouchableOpacity onPress={onPress} style={styles.questionContainer}>
      <Text style={styles.questionText}>{question}</Text>
      <Text style={styles.arrow}>{isActive ? '▲' : '▼'}</Text>
    </TouchableOpacity>
    <Collapsible collapsed={!isActive}>
      <Text style={styles.answerText}>{answer}</Text>
    </Collapsible>
  </View>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [activeIndexes, setActiveIndexes] = useState({
    general: null,
    nightride: null,
    safetrip: null,
  });

  const handlePress = (tab, index) => {
    setActiveIndexes((prevIndexes) => ({
      ...prevIndexes,
      [tab]: prevIndexes[tab] === index ? null : index,
    }));
  };

  // Function to render the appropriate tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <GeneralContent activeIndexes={activeIndexes} onPress={handlePress} />
        );
      case 'nightride':
        return (
          <NightRideContent activeIndexes={activeIndexes} onPress={handlePress} />
        );
      case 'safetrip':
        return (
          <SafeTripContent activeIndexes={activeIndexes} onPress={handlePress} />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.heading1}>DawgRide</Text>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'general' && styles.activeTab]}
          onPress={() => setActiveTab('general')}
        >
          <Text style={[styles.tabText, activeTab === 'general' && styles.activeText]}>General</Text>
        </TouchableOpacity>
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

      {/* Tab Content */}
      <ScrollView style={styles.contentArea}>
        {renderTabContent()}
      </ScrollView>
    </View>
  );
};

const GeneralContent = ({ activeIndexes, onPress }) => (
  <View style={styles.tabContent}>
    <Text style={styles.heading2}>How to use DawgRide</Text>
    <Text style={styles.text}>
      DawgRide is a mobile app that enhances the safety and convenience of late-night commutes for the UW community by building on existing Husky NightRide and SafeTrip services.
    </Text>
    <Text style={styles.heading3}>Frequently Asked Questions and Basic Information</Text>

    {FAQ_DATA.general.map((item, index) => (
      <FAQItem
        key={index}
        question={item.question}
        answer={item.answer}
        isActive={activeIndexes.general === index}
        onPress={() => onPress('general', index)}
      />
    ))}
  </View>
);

const NightRideContent = ({ activeIndexes, onPress }) => (
  <View style={styles.tabContent}>
    <Text style={styles.heading2}>NightRide Shuttle</Text>
    <Text style={styles.heading3}>How it works</Text>
    <Text style={styles.text}>
      NightRide shuttles pick up passengers at one of eight scheduled stops around campus. After the
      Flagpole stop, the last scheduled stop on campus, shuttles deviate from the fixed route to drop off 
      riders at their requested location within the East or West zone boundaries. To be dropped off in 
      the East zone, riders need to be on an East zone shuttle. Similarly, to be dropped off in the West 
      zone, riders need to be on a West zone shuttle. Riders can transfer from a West zone shuttle to an 
      East zone shuttle or vice versa at the Flagpole stop. Review the Frequently asked questions for 
      more information.
    </Text>
    <Text style={styles.heading3}>When it operates</Text>
    <Text style={styles.text}>
      Shuttles pick up passengers from 8 p.m. until 1:34 a.m. for the East zone and from 8 p.m. until 
      1:39 a.m. for the West zone, Monday through Friday (excluding University holidays) during the 
      Autumn, Winter and Spring quarters with extended service running until 3:30 a.m. the week before 
      and the week of finals. Pick up time schedules for both zones are listed below.
    </Text>
    <Text style={styles.heading3}>Things to note</Text>
    <Text style={styles.text}>
      {"\u2022"} Because the service allows for deviations, it may run behind schedule periodically.{'\n'}
      {"\u2022"} Please do not ask the driver to access an area that is challenging to navigate.
    </Text>
    <Text style={styles.heading3}>Frequently Asked Questions</Text>

    {FAQ_DATA.nightride.map((item, index) => (
      <FAQItem
        key={index}
        question={item.question}
        answer={item.answer}
        isActive={activeIndexes.nightride === index}
        onPress={() => onPress('nightride', index)}
      />
    ))}
  </View>
);

const SafeTripContent = ({ activeIndexes, onPress }) => (
  <View style={styles.tabContent}>
    <Text style={styles.heading2}>Husky SafeTrip</Text>
    <Text style={styles.text}>
      Husky SafeTrip (formerly Husky NightWalk) provides safe vehicle escorts at night with a uniformed
      security guard for UW students, faculty, and staff. Use Husky SafeTrip to get safely from campus 
      to your home, your car, or another UW building within the service area. {'\n'}
    </Text>
    <Text style={styles.text}>
      ⚠️ Not for routine transportation — Please use public transit or rideshare for grocery stores,
      restaurants, or other non-campus destinations.
    </Text>
    <Text style={styles.heading3}>How it works</Text>
    <Text style={styles.text}>
      1. Call 206-685-9255 when ready for a safety escort. {'\n'}
      2. Provide the dispatcher with your location (building name or address).{'\n'}
      3. Be outside and visible for pickup.{'\n'}
      4. Show your UW student, staff, or photo ID when requested.
    </Text>
    <Text style={styles.heading3}>When it operates</Text>
    <Text style={styles.text}>
      Hours: 6:30 p.m. – 2 a.m. daily {'\n'}
      Not available on University holidays or when UW suspends operations.
    </Text>
    

    <Text style={styles.heading3}>Frequently Asked Questions</Text>

    {FAQ_DATA.safetrip.map((item, index) => (
      <FAQItem
        key={index}
        question={item.question}
        answer={item.answer}
        isActive={activeIndexes.safetrip === index}
        onPress={() => onPress('safetrip', index)}
      />
    ))}
  </View>
);

// Styles
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
    gap: 15,
    marginBottom: 20,
    marginTop: 20,
  },

  tabButton: {
    padding: 10,
    paddingHorizontal: 25,
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
    backgroundColor: 'white',
  },

  tabContent: {
    marginTop: 20,
    paddingBottom: 100
  },

  heading2: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  heading3: {
    color: '#594a7b',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },

  text: {
    fontSize: 18,
  },

  faqItem: {
    marginBottom: 10,
  },

  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
  },

  questionText: {
    fontSize: 18,
  },

  answerText: {
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },

  arrow: {
    fontSize: 18,
  },
});

export default App;
